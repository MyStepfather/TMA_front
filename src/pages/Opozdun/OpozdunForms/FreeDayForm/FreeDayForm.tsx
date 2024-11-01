import styles from './FreeDayForm.module.css';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Textarea from '../../../../components/Textarea/Textarea.tsx';
import Button from '../../../../components/Buttton/Button.tsx';
import { OpozdunFormProps } from 'pages/Opozdun/Opozdun.types.ts';
import { useTelegram } from 'hooks/useTelegram.ts';
import axios from 'axios';
import { BOT_URL } from '../../../../api/api.ts';
import { TelegramBotData } from '../../../../types/types.ts';

function FreeDayForm({ handleAcceptAnswers, type }: OpozdunFormProps) {
	const [days, setDays] = useState<string>('');
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const { userId, username, firstName, lastName }: TelegramBotData =
		useTelegram();

	const handleSubmitClick = (e: FormEvent) => {
		e.preventDefault();

		const inputs = {
			days
		};

		const data = {
			userId,
			username,
			firstName,
			lastName,
			type,
			inputs
		};

		if (days) {
			setIsDisabled(false);

			try {
				axios.post(BOT_URL, data);
			} catch (error) {
				console.error('Ошибка при отправке запроса:', error);
			}

			handleAcceptAnswers({
				days
			});
			setDays('');
			setIsDisabled(true);
		}
	};

	useEffect(() => {
		if (days) {
			setIsDisabled(false);
		} else if (!days) {
			setIsDisabled(true);
		}
	}, [days]);

	const handleDaysChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setDays(e.target.value);
	};

	return (
		<form className={styles['form']} onSubmit={handleSubmitClick}>
			<Textarea
				label={'Сколько дней вы берете за свой счет:'}
				placeholder={'Вписать кол-во дней'}
				value={days}
				onChange={handleDaysChange}
			/>
			<Button disabled={isDisabled} className={styles.submit}>
				Отправить
			</Button>
		</form>
	);
}

export default FreeDayForm;
