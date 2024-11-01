import styles from './VacantForm.module.css';
import Button from '../../../../components/Buttton/Button.tsx';
import CalendarWidget from '../../../../components/CalendarWidget/CalendarWidget.tsx';
import { OpozdunFormProps } from 'pages/Opozdun/Opozdun.types.ts';
import { FormEvent, useEffect, useState } from 'react';
import { Range } from 'react-date-range';
import { useTelegram } from 'hooks/useTelegram.ts';
import axios from 'axios';
import { BOT_URL } from '../../../../api/api.ts';
import { TelegramBotData } from '../../../../types/types.ts';

const initialRange = [
	{
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection'
	}
];
function VacantForm({ handleAcceptAnswers, type }: OpozdunFormProps) {
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [range, setRange] = useState<Range[]>(initialRange);
	const { userId, username, firstName, lastName }: TelegramBotData =
		useTelegram();

	const handleSubmitClick = (e: FormEvent) => {
		e.preventDefault();

		const inputs = {
			from:
				range.length > 0 && range[0].startDate
					? range[0].startDate.toLocaleDateString('ru-RU', {
							day: '2-digit',
							month: '2-digit',
							year: '2-digit'
					  })
					: '',
			to:
				range.length > 0 && range[0].endDate
					? range[0].endDate.toLocaleDateString('ru-RU', {
							day: '2-digit',
							month: '2-digit',
							year: '2-digit'
					  })
					: ''
		};

		const data = {
			userId,
			username,
			firstName,
			lastName,
			type,
			inputs
		};

		if (range) {
			setIsDisabled(false);

			try {
				console.log(data);
				axios.post(BOT_URL, data);
			} catch (error) {
				console.error('Ошибка при отправке запроса:', error);
			}

			handleAcceptAnswers({
				range
			});
			setRange(initialRange);
			setIsDisabled(true);
		}
	};

	useEffect(() => {
		if (range) {
			setIsDisabled(false);
		} else if (!range) {
			setIsDisabled(true);
		}
	}, [range]);

	return (
		<form className={styles['form']} onSubmit={handleSubmitClick}>
			<div className={styles['calendar']}>
				<div className={styles['label']}>Укажте даты отпуска</div>
				<CalendarWidget state={range} setState={setRange} />
			</div>
			<Button disabled={isDisabled} className={styles.submit}>
				Отправить
			</Button>
		</form>
	);
}

export default VacantForm;
