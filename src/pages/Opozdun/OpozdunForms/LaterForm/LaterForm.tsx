import styles from './LaterForm.module.css';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { TimePickerInput } from '../../../../components/TimePicker/TimePicker.tsx';
import Textarea from '../../../../components/Textarea/Textarea.tsx';
import Button from '../../../../components/Buttton/Button.tsx';
import { OpozdunFormProps } from 'pages/Opozdun/Opozdun.types.ts';
import { useTelegram } from 'hooks/useTelegram.ts';
import axios from 'axios';
import { BOT_URL } from '../../../../api/api.ts';
import { TelegramBotData } from '../../../../types/types.ts';
function LaterForm({ handleAcceptAnswers, type }: OpozdunFormProps) {
	const [time, setTime] = useState<string>('');
	const [reason, setReason] = useState<string>('');
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const timePicker = useRef<HTMLInputElement>(null);
	const { userId, username, firstName, lastName }: TelegramBotData =
		useTelegram();

	const handleReasonChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setReason(e.target.value);
	};

	const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTime(e.target.value);
	};

	const handleSubmitClick = (e: FormEvent) => {
		e.preventDefault();

		const inputs = {
			time,
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

		if (time && reason) {
			setIsDisabled(false);

			try {
				axios.post(BOT_URL, data);
			} catch (error) {
				console.error('Ошибка при отправке запроса:', error);
			}

			handleAcceptAnswers({
				time,
				reason
			});

			setTime('');
			setReason('');
			setIsDisabled(true);
		}
	};

	useEffect(() => {
		if (reason && time) {
			setIsDisabled(false);
		} else if (!time || !reason) {
			setIsDisabled(true);
		}
	}, [reason, time]);

	return (
		<form className={styles['form']} onSubmit={handleSubmitClick}>
			<TimePickerInput
				label={'Во сколько ты будешь?'}
				value={time}
				onChange={handleTimeChange}
				ref={timePicker}
			/>
			<Textarea
				label={'Почему ты будешь позже?'}
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

export default LaterForm;
