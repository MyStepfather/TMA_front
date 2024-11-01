import styles from './Calendar.module.css';
import HeadingTitle from '../../components/HeadingTitle/HeadingTitle.tsx';
import CalendarItem from './CalendarItem/CalendarItem.tsx';
import { useLocalizedMonth } from '../../hooks/useLocalizedData.ts';
import { AxiosError } from 'axios';
import api from '../../api/axios.ts';
import { useCallback, useEffect, useState } from 'react';
import { TEvent } from 'types/types.ts';
import { CalendarFilter } from './CalendarFilter/CalendarFilter.tsx';
import { sortMonths } from '../../functions/sortMonths.ts';
function Calendar() {
	const [events, setEvents] = useState<TEvent[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
	const [selectedMonth, setSelectedMonth] = useState(
		new Date().getMonth() + 1
	);
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

	const localizedMonth = useLocalizedMonth(selectedMonth);

	const getEvents = async (): Promise<TEvent | undefined> => {
		setError('');
		setEvents([]);

		try {
			const { data } = await api.get(
				`/events?month=${selectedMonth}&year=${selectedYear}`
			);

			setEvents(data);

			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.response?.data.message);
				throw new Error(e.response?.data.message);
			}
			return;
		}
	};

	useEffect(() => {
		getEvents();
	}, [selectedMonth, selectedYear]);

	const handleToggleFilter = useCallback(() => {
		setIsFilterOpen(prev => !prev);
	}, []);

	const handleDatePickerClick = () => {
		if (isFilterOpen) {
			setIsFilterOpen(false);
		} else {
			setIsFilterOpen(true);
		}
	};
	const handlePrevMonth = useCallback(() => {
		if (selectedMonth === 1) {
			setSelectedMonth(12);
			setSelectedYear(selectedYear - 1);
		} else {
			setSelectedMonth(selectedMonth - 1);
		}
	}, [selectedMonth, selectedYear]);

	const handleNextMonth = useCallback(() => {
		if (selectedMonth === 12) {
			setSelectedMonth(1);
			setSelectedYear(selectedYear + 1);
		} else {
			setSelectedMonth(selectedMonth + 1);
		}
	}, [selectedMonth, selectedYear]);
			
	return (
		<div className={styles['content']}>
			<div className={styles['title']}>
				<HeadingTitle>Календарь событий</HeadingTitle>
				<CalendarFilter
					toggler={handleToggleFilter}
					isFilterOpen={isFilterOpen}
					month={localizedMonth}
					year={selectedYear}
					handlePrevMonth={handlePrevMonth}
					handleNextMonth={handleNextMonth}
				/>
				<div
					className={styles['datePicker']}
					onClick={handleDatePickerClick}
				>
					<img src="/icons/arrow_left.svg" alt="стрелочка влево" />
					<div className={styles['month']}>{localizedMonth}</div>
				</div>
			</div>
			<div className={styles['itemsList']}>
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
		</div>
	);
}

export default Calendar;
