import styles from './DistantForm.module.css';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Textarea from '../../../../components/Textarea/Textarea.tsx';
import Button from '../../../../components/Buttton/Button.tsx';
import { OpozdunFormProps } from 'pages/Opozdun/Opozdun.types.ts';
import { useTelegram } from 'hooks/useTelegram.ts';
import axios from 'axios';
import { BOT_URL } from '../../../../api/api.ts';
import { TelegramBotData } from '../../../../types/types.ts';

function DistantForm({ handleAcceptAnswers, type }: OpozdunFormProps) {
	const [days, setDays] = useState<string>('');
	const [reason, setReason] = useState<string>('');
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const { userId, username, firstName, lastName }: TelegramBotData =
		useTelegram();

	const handleReasonChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setReason(e.target.value);
	};

	const handleDaysChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setDays(e.target.value);
	};

	const handleSubmitClick = (e: FormEvent) => {
		e.preventDefault();

		const inputs = {
			days,
			reason
		};

		const data = {
			userId,
			username,
			firstName,
			lastName,
			type,
			inputs
		};

		if (days && reason) {
			setIsDisabled(false);

			try {
				axios.post(BOT_URL, data);
			} catch (error) {
				console.error('Ошибка при отправке запроса:', error);
			}

			handleAcceptAnswers({
				days,
				reason
			});
			setDays('');
			setReason('');
			setIsDisabled(true);
		}
	};

	useEffect(() => {
		if (days && reason) {
			setIsDisabled(false);
		} else if (!reason || !days) {
			setIsDisabled(true);
		}
	}, [days, reason]);

	return (
		<form className={styles['form']} onSubmit={handleSubmitClick}>
			<Textarea
				label={'Сколько планируешь работать на удаленке:'}
				placeholder={'Вписать кол-во дней'}
				value={days}
				onChange={handleDaysChange}
			/>
			<Textarea
				label={'Кратко укажите причину, почему ты на удаленке:'}
				placeholder={'Сдаю экзамен в универе...'}
				value={reason}
				onChange={handleReasonChange}
			/>
			<Button disabled={isDisabled} className={styles.submit}>
				Отправить
			</Button>
		</form>
	);
}

export default DistantForm;
