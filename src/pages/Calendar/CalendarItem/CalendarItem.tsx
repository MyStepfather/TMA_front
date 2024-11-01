import styles from './CalendarItem.module.css';
import { CalendarItemProps } from './CalendarItem.props.tsx';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
function CalendarItem({ date, title, label, type }: CalendarItemProps) {
	const location = useLocation();

	const formatDateToRussian = (dateString: string | undefined): string => {
		if (dateString) {
			const [_, month, day] = dateString.split('-').map(Number);
			const year = new Date().getFullYear();
			const date = new Date(year, month - 1, day);
			const options: Intl.DateTimeFormatOptions = {
				weekday: 'short',
				day: 'numeric',
				month: 'long'
			};
			return date.toLocaleDateString('ru-RU', options);
		}
		return '';
	};

	function isBirthdayComputing(date: string | undefined): boolean {
		if (date) {
			const [year, month, day] = date.split('-').map(Number);
			const birthdayDate = new Date(year, month - 1, day);
			const today = new Date();

			return (
				birthdayDate.getMonth() === today.getMonth() &&
				birthdayDate.getDate() === today.getDate()
			);
		}
		return false;
	}

	return (
		<div
			className={cn(styles['item'], {
				[styles['birthday']]:
					isBirthdayComputing(date) && type === 'birthday',
				[styles['at_home_page']]: location.pathname === '/'
			})}
		>
			<div className={styles['label']}>
				{formatDateToRussian(date) || label}
			</div>
			<div className={styles['wrapper']}>
				<p className={styles['title']}>{title}</p>
				{type && isBirthdayComputing(date) && (
					<img
						className={styles['icon']}
						src="/icons/birthday.svg"
						alt="Иконка День рождения"
					/>
				)}
			</div>
		</div>
	);
}

export default CalendarItem;
