import styles from './BusinessForm.module.css';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Textarea from '../../../../components/Textarea/Textarea.tsx';
import Button from '../../../../components/Buttton/Button.tsx';
import { OpozdunFormProps } from 'pages/Opozdun/Opozdun.types.ts';
import { useTelegram } from 'hooks/useTelegram.ts';
import axios from 'axios';
import { BOT_URL } from '../../../../api/api.ts';
import { TelegramBotData } from '../../../../types/types.ts';

function BusinessForm({ handleAcceptAnswers, type }: OpozdunFormProps) {
	const [days, setDays] = useState<string>('');
	const [location, setLocation] = useState<string>('');
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const { userId, username, firstName, lastName }: TelegramBotData =
		useTelegram();

	const handleLocationChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setLocation(e.target.value);
	};

	const handleDaysChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setDays(e.target.value);
	};

	const handleSubmitClick = (e: FormEvent) => {
		e.preventDefault();

		const inputs = {
			days,
			location
		};

		const data = {
			userId,
			username,
			firstName,
			lastName,
			type,
			inputs
		};

		if (days && location) {
			setIsDisabled(false);

			try {
				axios.post(BOT_URL, data);
			} catch (error) {
				console.error('Ошибка при отправке запроса:', error);
			}

			handleAcceptAnswers({
				days,
				location
			});
			setDays('');
			setLocation('');
			setIsDisabled(true);
		}
	};

	useEffect(() => {
		if (days && location) {
			setIsDisabled(false);
		} else if (!location || !days) {
			setIsDisabled(true);
		}
	}, [days, location]);

	return (
		<form className={styles['form']} onSubmit={handleSubmitClick}>
			<Textarea
				label={'На какое количество дней ты уезжаешь в командировку?'}
				placeholder={'Вписать кол-во дней'}
				value={days}
				onChange={handleDaysChange}
			/>
			<Textarea
				label={'Укажите место командировки или проект:'}
				placeholder={'Вписать место'}
				value={location}
				onChange={handleLocationChange}
			/>
			<Button disabled={isDisabled} className={styles.submit}>
				Отправить
			</Button>
		</form>
	);
}

export default BusinessForm;
