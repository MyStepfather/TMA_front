import { FC, useRef } from 'react';
import styles from './CalendarFilter.module.css';
import arrow_left from '../../../../public/icons/arrow_left.svg';
import arrow_right from '../../../../public/icons/arrow_rigth.svg';
import cn from 'classnames';
import { useClickOutside } from 'hooks/useClickOutside';

interface CalendarFilterProps {
	isFilterOpen: boolean;
	month: string;
	year: number;
	handleNextMonth: () => void;
	handlePrevMonth: () => void;
	toggler: () => void;
}

export const CalendarFilter: FC<CalendarFilterProps> = ({
	isFilterOpen,
	month,
	year,
	handleNextMonth,
	handlePrevMonth,
	toggler
}) => {
	const ref = useRef<HTMLDivElement>(null);

	useClickOutside(ref, () => {
		if (isFilterOpen) {
			toggler();
		}
	});

	return (
		<div
			ref={ref}
			className={cn(styles.wrapper, {
				[styles.visible]: isFilterOpen
			})}
		>
			<div className={styles.content}>
				<img
					src={arrow_left}
					alt="стрелка влево"
					onClick={handlePrevMonth}
				/>
				<div className={styles.date}>
					<span>{month}</span>
					<span>{year}</span>
				</div>
				<img
					src={arrow_right}
					alt="стрелка вправо"
					onClick={handleNextMonth}
				/>
			</div>
		</div>
	);
};
