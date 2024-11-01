import styles from './Home.module.css';
import MenuItem from './MenuItem/MenuItem.tsx';
import { MenuItemProps } from './MenuItem/MenuItem.props.ts';
import CalendarItem from '../Calendar/CalendarItem/CalendarItem.tsx';
import { useEffect, useState } from 'react';
import { TEvent } from 'types/types.ts';
import { AxiosError } from 'axios';
import api from '../../api/axios.ts';
import { sortMonths } from '../../functions/sortMonths.ts';
import { filterTodaysEvents } from '../../functions/filterTodaysEvents.ts';
function Home() {
	const menuItems: MenuItemProps[] = [
		{
			title: 'Реквизиты',
			image: '/icons/menu_req.svg',
			path: '/requisites'
		},
		{
			title: 'Презентации',
			image: '/icons/menu_pres.svg',
			path: '/presentations'
		},
		{
			title: 'Календарь',
			image: '/icons/menu_calendar.svg',
			path: '/calendar'
		},
		{
			title: 'Опоздун',
			image: '/icons/menu_opozdun.svg',
			path: '/opozdun'
		},
		{
			title: 'Оборудование',
			image: '/icons/menu_devices.svg',
			path: '/devices'
		},
		{
			title: 'Моя карточка',
			image: '/icons/menu_profile.svg',
			path: '/profile'
		}
	];

	const [events, setEvents] = useState<TEvent[]>([]);
	const [error, setError] = useState<string | null>(null);

	// const getEvents = async (): Promise<TEvent | undefined> => {
	// 	try {
	// 		const { data } = await api.get('/events/active');
	// 		setEvents(filterCurrentEvents(data));
	// 		return data;
	// 	} catch (e) {
	// 		if (e instanceof AxiosError) {
	// 			setError(e.response?.data.message);
	// 			throw new Error(e.response?.data.message);
	// 		}
	// 		return;
	// 	}
	// };

	// временная реализация
	const [selectedMonth] = useState(
		new Date().getMonth() + 1
	);
	const [selectedYear] = useState(new Date().getFullYear());
	const currentMonth = new Date().getMonth() + 1;

	const getEvents = async (): Promise<TEvent | undefined> => {
		setError('');
		setEvents([]);

		try {
			const { data } = await api.get(
				`/events?month=${selectedMonth}&year=${selectedYear}`
			);

			if (currentMonth === selectedMonth) {
				setEvents(filterTodaysEvents(data));
			} else {
				setEvents(data);
			}
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.response?.data.message);
				throw new Error(e.response?.data.message);
			}
			return;
		}
	};

	/////
	useEffect(() => {
		getEvents();
	}, []);

	return (
		<div className={styles['content']}>
			<div className={styles['itemsList']}>
				{menuItems.map((item, index) => {
					return (
						<MenuItem
							key={index}
							title={item.title}
							image={item.image}
							path={item.path}
						/>
					);
				})}
			</div>
			{events &&
				sortMonths(events).map(e => {
					return (
						<CalendarItem
							key={e.id}
							id={e.id}
							date={e.date}
							title={e.title}
							type={e.type}
						/>
					);
				})}
			{error && <div>{error}</div>}
		</div>
	);
}

export default Home;
