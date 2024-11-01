import styles from './Requisites.module.css';
import HeadingTitle from '../../components/HeadingTitle/HeadingTitle.tsx';
import Tab from '../../components/Tab/Tab.tsx';
import FullPageWidthWrapper from '../../HOC/FullPageWidthWrapper/FullPageWidthWrapper.tsx';
import {RequisitesItemProps} from './RequisitesItem/RequisitesItem.props.ts';
import RequisitesItem from './RequisitesItem/RequisitesItem.tsx';
import {useEffect, useState} from 'react';
import api from '../../api/axios.ts';
import {AxiosError} from 'axios';
import {ActiveTab} from '../../components/Tab/Tab.props.ts';
import { CompanyTypes } from './Company.types.ts';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton.tsx';
function Requisites() {
	const [activeTab, setActiveTab] = useState<ActiveTab>({activeTabId: 0, activeCategory: 0});
	const [requisites, setRequisites] = useState<RequisitesItemProps[]>([]);
	const [companies, setCompanies] = useState<CompanyTypes[]>([]);
	const [error, setError] = useState<string>('');
	const [isEnd, setIsEnd] = useState<boolean>(false);
	const [page, setPage] = useState<number>(1);

	const getCompanies = async (): Promise<CompanyTypes[]> => {
		try {
			const {data} = await api.get('/requisites/companies');
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.response?.data.message);
				throw new Error(e.response?.data.message);
			}
			return [];
		}
	};

	const getRequisites = async (categoryId: number, currentPage: number): Promise<RequisitesItemProps[]> => {
		try {
			const {data: paginator} = await api.get(`/requisites?company_id=${categoryId}&page=${currentPage}&per_page=${5}`);
			if (paginator.next_page_url === null) {
				setIsEnd(true);
			} else {
				setIsEnd(false);
			}
			return paginator.data;
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.response?.data.message);
				throw new Error(e.response?.data.message);
			}
			return [];
		}
	};

	const clickOnTabHandler = (id: number): void => {
		setPage(1);
		setActiveTab({
			activeTabId: id,
			activeCategory: id
		});
	};

	const loadMore = async () => {
		if (!isEnd) {
			const nextPage = page + 1;
			setPage(nextPage);
			const data = await getRequisites(activeTab.activeCategory, nextPage);
			setRequisites(prevState => prevState.concat(data));
		}
	};

	useEffect(() => {
		getCompanies().then(data => {
			setCompanies(data);
		});
	}, []);

	useEffect(() => {
		getRequisites(activeTab.activeCategory, page).then(data => {
			setRequisites(data);
		});
	}, [activeTab.activeCategory]);

	return (
		<div className={styles['content']}>
			<HeadingTitle>Реквизиты компаний</HeadingTitle>
			<FullPageWidthWrapper className={styles['categoriesWrapper']}>
				<div className={styles['categoriesList']}>
					{<Tab
						key={0}
						clickHandler={() => clickOnTabHandler(0)}
						type={'category'}
						isActive={activeTab.activeTabId === 0}
					>
						{'Все'}
					</Tab>}
					{companies.map((item, index) => {
						return (
							<Tab
								key={index+1}
								clickHandler={() => clickOnTabHandler(item.id)}
								type={'category'}
								isActive={activeTab.activeTabId === item.id}
							>
								{item.name}
							</Tab>
						);
					})}
				</div>
			</FullPageWidthWrapper>
			<div className={styles['requisitesItemsList']}>
				{!error ? requisites.map(item => {
					return <RequisitesItem {...item} title={`Реквизиты компании ${item.title}`} key={item.id}/>;
				}) : <>{error}</>}
			</div>
			<LoadMoreButton disabled={isEnd} onClick={loadMore} />
		</div>
	);
}

export default Requisites;