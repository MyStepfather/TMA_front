import Search from '../../components/Search/Search.tsx';
import styles from './Presentations.module.css';
import HeadingTitle from '../../components/HeadingTitle/HeadingTitle.tsx';
import Tab from '../../components/Tab/Tab.tsx';
import FullPageWidthWrapper from '../../HOC/FullPageWidthWrapper/FullPageWidthWrapper.tsx';
import PresentationItem from './PresentationItem/PresentationItem.tsx';
import Filter from './Filter/Filter.tsx';
import { ChangeEvent, useEffect, useState } from 'react';
import cn from 'classnames';
import {
	TCategory,
	TCompany,
	TPresentation,
	TPresentationResponse,
	TQueryParams
} from '../../types/types.ts';
import api from '../../api/axios.ts';
import { AxiosError, AxiosResponse } from 'axios';
import { useDebounce } from '../../hooks/useDebounce.ts';
import { LoadMoreButton } from '../../components/LoadMoreButton/LoadMoreButton.tsx';

const initialCompany = {
	id: 0,
	name: 'Все'
};

function Presentations() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isTypeOpen, setIsTypeOpen] = useState<boolean>(false);
	const [activeTab, setActiveTab] = useState<number>(0);
	const [allCategories, setAllCategories] = useState<TCategory[]>([]);
	const [filterLabels, setFilterLabels] = useState<TCategory[]>([]);
	const [filterTypeLabels, setFilterTypeLabels] = useState<TCategory[]>([]);
	const [presentations, setPresentations] = useState<TPresentation[]>([]);
	const [error, setError] = useState<string>('');
	const [companies, setCompanies] = useState<TCompany[]>([initialCompany]);
	const [selectedFilters, setSelectedFilters] = useState<string>('');
	const [search, setSearch] = useState<string>('');
	const [page, setPage] = useState<number>(1);
	const [isEnd, setIsEnd] = useState<boolean>(false);
	const [perPage] = useState<number>(5);

	const [queryParams, setQueryParams] = useState<TQueryParams>({
		searchValue: search,
		categoriesId: selectedFilters,
		companyId: activeTab,
		page: page,
		perPage: perPage
	});

	const getCompanies = async (): Promise<TCompany[]> => {
		try {
			const { data } = await api.get('/presentations/companies');

			setCompanies([initialCompany, ...data]);
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.response?.data.message);
				throw new Error(e.response?.data.message);
			}
			return [];
		}
	};

	const getCategories = async (): Promise<TCategory[]> => {
		try {
			const { data } = await api.get('/presentations/categories');

			setAllCategories(data);
			const categories = data;
			const lastFour = categories.slice(-4);
			const rest = categories.slice(0, -4);
			setFilterLabels(lastFour);
			setFilterTypeLabels(rest);
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.response?.data.message);
				throw new Error(e.response?.data.message);
			}
			return [];
		}
	};

	useEffect(() => {
		getCompanies();
		getCategories();
	}, []);

	const getPresentations = async (
		params?: object
	): Promise<TPresentationResponse | undefined> => {
		setError('');

		try {
			const response: AxiosResponse<TPresentationResponse> =
				await api.get('/presentations', {
					params,
					headers: {
						'Content-Type': 'application/json'
					}
				});

			if (response.data.next_page_url === null) {
				setIsEnd(true);
			} else {
				setIsEnd(false);
			}

			if (response.data.current_page === 1) {
				setPresentations(response.data.data);
			} else {
				setPresentations(prev => [...prev, ...response.data.data]);
			}
			setPage(response.data.current_page);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				setError(error.response?.data.message);
				throw new Error(error.response?.data.message);
			}
			return undefined;
		}
	};

	const debouncedSearch = useDebounce(search, 500);

	useEffect(() => {
		setQueryParams({
			searchValue: debouncedSearch,
			categoriesId: selectedFilters,
			companyId: activeTab,
			page: page,
			perPage: perPage
		});
	}, [debouncedSearch, selectedFilters, activeTab, page, perPage]);

	useEffect(() => {
		getPresentations(queryParams);
	}, [queryParams]);

	const filterTypeIconClassName = cn(styles.filterIcon, styles.typeIcon, {
		[styles.active]: isTypeOpen
	});

	const filterIconClassName = cn(styles.filterIcon, {
		[styles.active]: isOpen
	});

	const filterVisibleToggler = (): void => {
		setIsOpen(prevState => !prevState);
		setIsTypeOpen(false);
	};

	const filterTypeVisibleToggler = (): void => {
		setIsTypeOpen(prevState => !prevState);
		setIsOpen(false);
	};

	const handleFilterChange = (filterId: number) => {
		setPage(1);
		setSelectedFilters(prevState => {
			const filters = prevState.split(',').map(Number);
			const index = filters.indexOf(filterId);
			if (index === -1) {
				return [...filters, filterId].filter(Boolean).join(',');
			} else {
				filters.splice(index, 1);
				return filters.filter(Boolean).join(',');
			}
		});
	};

	const handleCompanyChange = (id: number) => {
		setPage(1);
		setActiveTab(id);
	};

	const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const loadMore = async () => {
		if (!isEnd) {
			setPage(prev => prev + 1);
		}
	};

	return (
		<div className={styles['content']}>
			<Filter
				toggler={filterTypeVisibleToggler}
				isMenuOpen={isTypeOpen}
				labels={filterTypeLabels}
				onFilterChange={handleFilterChange}
				selectedFilters={selectedFilters}
			/>
			<Filter
				toggler={filterVisibleToggler}
				isMenuOpen={isOpen}
				labels={filterLabels}
				onFilterChange={handleFilterChange}
				selectedFilters={selectedFilters}
			/>
			<HeadingTitle>Презентации</HeadingTitle>
			<div className={styles['searchWrapper']}>
				<Search
					onInput={searchHandler}
					value={search}
					placeholder={'Поиск'}
				/>
				<div
					onClick={filterTypeVisibleToggler}
					className={filterTypeIconClassName}
				>
					<img src="/icons/folder.svg" alt="Кнопка фильтра типов" />
				</div>
				<div
					onClick={filterVisibleToggler}
					className={filterIconClassName}
				>
					<img src="/icons/filter.svg" alt="Кнопка фильтра" />
				</div>
			</div>
			<FullPageWidthWrapper className={styles['categoriesWrapper']}>
				<div className={styles['categoriesList']}>
					{companies.map(company => {
						return (
							<Tab
								key={company.id}
								clickHandler={() =>
									handleCompanyChange(company.id)
								}
								type={'category'}
								isActive={activeTab === company.id}
							>
								{company.name}
							</Tab>
						);
					})}
				</div>
			</FullPageWidthWrapper>
			<div className={styles['presentationsList']}>
				{!error ? (
					presentations.map(presentation => (
						<PresentationItem
							key={presentation.id}
							presentation={presentation}
							allCategories={allCategories}
						/>
					))
				) : (
					<>{error}</>
				)}
			</div>
			<LoadMoreButton disabled={isEnd} onClick={loadMore} />
		</div>
	);
}

export default Presentations;
