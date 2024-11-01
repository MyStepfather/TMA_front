import styles from './Device.module.css';
import { useParams } from 'react-router-dom';
import HeadingTitle from 'components/HeadingTitle/HeadingTitle.tsx';
import { DeviceItemProps } from 'pages/Devices/DeviceItem/DeviceItem.props.ts';
import Slider from 'components/Slider/Slider.tsx';
import Downloader from 'components/Downloader/Downloader.tsx';
import Accordion from 'components/Accordion/Accordion.tsx';
import Tab from 'components/Tab/Tab.tsx';
import FullPageWidthWrapper from '../../HOC/FullPageWidthWrapper/FullPageWidthWrapper.tsx';
import { useEffect, useState } from 'react';
import DocumentItem from 'pages/Device/DocumentItem/DocumentItem.tsx';
import { ActiveTab } from 'components/Tab/Tab.props.ts';
import api from '../../api/axios.ts';
import { AxiosError } from 'axios';
import { Toast } from 'components/Toast/Toast.tsx';

function Device() {
	const [device, setDevice] = useState<DeviceItemProps>();
	const [activeTab, setActiveTab] = useState<ActiveTab>({
		activeCategory: 0,
		activeTabId: 0
	});
	const [error, setError] = useState<string>('');
	const [page, setPage] = useState<number>(1);
	// const [isEnd, setIsEnd] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { id: deviceId } = useParams();
	const [activeIndexImage, setActiveIndexImage] = useState<number>(0);
	const [message, setMessage] = useState<string | null>(null);
	const [type, setType] = useState<'success' | 'error' | null>(null);

	const getDevice = async () => {
		try {
			setIsLoading(true);
			const { data } = await api.get<DeviceItemProps>(
				`/device/${deviceId}`
			);
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.response?.data.message);
			}
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

	useEffect(() => {
		getDevice().then(data => {
			setDevice(data);
		});
	}, [page]);

	const handleCopyThumb = () => {
		if (Array.isArray(device?.gallery)) {
			navigator.clipboard
				.writeText(device?.gallery[activeIndexImage])
				.then(() => {
					setMessage('Ссылка скопирована в буфер обмена');
					setType('success');
				})
				.catch(err => {
					setMessage('Ошибка копирования ссылки');
					setType('error');
					console.error(err);
				});
		} else if (typeof device?.gallery === 'string') {
			navigator.clipboard
				.writeText(device?.gallery)
				.then(() => {
					setMessage('Ссылка скопирована в буфер обмена');
					setType('success');
				})
				.catch(err => {
					setMessage('Ошибка копирования ссылки');
					setType('error');
					console.error(err);
				});
		} else if (device?.thumb) {
			navigator.clipboard
				.writeText(device?.thumb)
				.then(() => {
					setMessage('Ссылка скопирована в буфер обмена');
					setType('success');
				})
				.catch(err => {
					setMessage('Ошибка копирования ссылки');
					setType('error');
					console.error(err);
				});
		}
	};

	useEffect(() => {
		const timerId = setTimeout(() => {
			setMessage(null);
			setType(null);
		}, 2000);
		return () => clearTimeout(timerId);
	}, [message, type]);

	return (
		<>
			<div className={styles['page']}>
				<HeadingTitle>{device?.title}</HeadingTitle>
				<div className={styles['body']}>
					<div className={styles['gallery']}>
						{Array.isArray(device?.gallery) &&
							device?.gallery.length > 0 && (
								<Slider
									setActiveIndexImage={setActiveIndexImage}
									paginationOptions={{ clickable: true }}
									slides={device?.gallery}
								/>
							)}
						{typeof device?.gallery === 'string' && (
							<img
								className={styles['slide']}
								src={device?.gallery}
								alt="изображение"
							/>
						)}
						<Downloader
							className={styles['downloader']}
							onClick={handleCopyThumb}
						/>
					</div>
					{device?.info && (
						<Accordion
							head={'Характеристики изделия'}
							body={device?.info}
						/>
					)}
					<FullPageWidthWrapper
						className={styles['categoriesWrapper']}
					>
						<div className={styles['categoriesList']}>
							<Tab
								type={'category'}
								clickHandler={() => clickOnTabHandler(0)}
								isActive={activeTab.activeTabId === 0}
							>
								Все
							</Tab>
							{device?.documents?.length &&
								device?.documents.map(item => {
									return (
										<Tab
											key={item.id}
											clickHandler={() =>
												clickOnTabHandler(
													item.category_id
												)
											}
											type={'category'}
											isActive={
												activeTab.activeTabId ===
												item.category_id
											}
										>
											{item.category.title}
										</Tab>
									);
								})}
						</div>
					</FullPageWidthWrapper>
					{activeTab.activeTabId === 0 &&
						device?.documents?.map(doc => {
							return (
								<DocumentItem
									key={doc.id}
									tag={doc.title}
									title={doc.title}
									file_path={doc.path}
								/>
							);
						})}
				</div>
				{isLoading && <>Загружаем...</>}
				{!!error && error}
			</div>
			<Toast message={message} type={type} />
		</>
	);
}

export default Device;
