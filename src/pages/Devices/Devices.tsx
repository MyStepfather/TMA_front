import Search from '../../components/Search/Search.tsx';
import styles from './Devices.module.css';
import HeadingTitle from '../../components/HeadingTitle/HeadingTitle.tsx';
import Tab from '../../components/Tab/Tab.tsx';
import {Category} from './Devices.types.ts';
import FullPageWidthWrapper from '../../HOC/FullPageWidthWrapper/FullPageWidthWrapper.tsx';
import DeviceItem from 'pages/Devices/DeviceItem/DeviceItem.tsx';
import {ChangeEvent, useEffect, useState} from 'react';
import api from '../../api/axios.ts';
import {AxiosError} from 'axios';
import {DeviceItemProps} from 'pages/Devices/DeviceItem/DeviceItem.props.ts';
import {ActiveTab} from 'components/Tab/Tab.props.ts';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton.tsx';

function Devices() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [devices, setDevices] = useState<DeviceItemProps[]>([]);
	const [activeTab, setActiveTab] = useState<ActiveTab>({activeCategory: 0, activeTabId: 0});
	const [error, setError] = useState<string>('');
	const [page, setPage] = useState<number>(1);
	const [isEnd, setIsEnd] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [search, setSearch] = useState<string>('');

	const getCategories = async (): Promise<Category[]> => {
		try {
			setIsLoading(true);
			const {data} = await api.get('/devices/categories');
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.response?.data.message);
				throw new Error(e.response?.data.message);
			}
			return [];
		} finally {
			setIsLoading(false);
		}
	};

	const getDevices = async (categoryId: number, currentPage: number, search: string): Promise<DeviceItemProps[]> => {
		try {
			setError('');
			setIsLoading(true);
			const {data: paginator} = await api.get(`/devices?filter=${categoryId}&search=${search}&page=${currentPage}&perPage=${10}`);
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
		} finally {
			setIsLoading(false);
		}
	};

	const clickOnTabHandler = (id: number): void => {
		setPage(1);
		setActiveTab({
			activeTabId: id,
			activeCategory: id
		});
	};

	const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const loadMore = async () => {
		if (!isEnd) {
			const nextPage = page + 1;
			setPage(nextPage);
			const data = await getDevices(activeTab.activeCategory, nextPage, search);
			setDevices(prevState => prevState.concat(data));
		}
	};

	useEffect(() => {
		getCategories().then(data => {
			setError('');
			setCategories(data);
		});
	}, []);

	useEffect(() => {
		getDevices(activeTab.activeCategory, page, search).then(data => {
			setError('');
			setDevices(data);
		});
	}, [activeTab.activeCategory]);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			getDevices(activeTab.activeCategory, page, search).then(data => {
				setError('');
				setDevices(data);
			});
		}, 500);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [search]);

	return (
		<div className={styles['content']}>
			<HeadingTitle>Оборудование</HeadingTitle>
			<div className={styles['searchWrapper']}>
				<Search onInput={searchHandler} value={search} placeholder={'Поиск'}/>
			</div>
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
					{categories.map(item => {
						return <Tab
							key={item.id}
							clickHandler={() => clickOnTabHandler(item.id)}
							type={'category'}
							isActive={activeTab.activeTabId === item.id}
						>
							{item.title}
						</Tab>;
					})}
				</div>
			</FullPageWidthWrapper>
			<div className={styles['devices_list']}>
				{!error ? devices.map(item => {
					return (
						<DeviceItem
							key={item.id}
							id={item.id}
							title={item.title}
							thumb={item.thumb}
						/>
					);
				}) : <>{error}</>}
				{isLoading && <>Загрузка...</>}
			</div>
			<LoadMoreButton disabled={isEnd} onClick={loadMore} />
		</div>
	);
}

export default Devices;