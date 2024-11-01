import styles from './SickForm.module.css';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Textarea from '../../../../components/Textarea/Textarea.tsx';
import Button from '../../../../components/Buttton/Button.tsx';
import Tab from 'components/Tab/Tab.tsx';
import { OpozdunFormProps } from 'pages/Opozdun/Opozdun.types.ts';
import { useTelegram } from 'hooks/useTelegram.ts';
import axios from 'axios';
import { BOT_URL } from '../../../../api/api.ts';
import { TelegramBotData } from '../../../../types/types.ts';

function SickForm({ handleAcceptAnswers, type }: OpozdunFormProps) {
	const [days, setDays] = useState<string>('');
	const [isSickLeave, setIsSickLeave] = useState<boolean | null>(null);
	const [isWorking, setIsWorking] = useState<boolean | null>(null);
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const { userId, username, firstName, lastName }: TelegramBotData =
		useTelegram();

	const handleDaysChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setDays(e.target.value);
	};

	const handleSubmitClick = (e: FormEvent) => {
		e.preventDefault();

		const inputs = {
			days,
			isSickLeave,
			isWorking
		};

		const data = {
			userId,
			username,
			firstName,
			lastName,
			type,
			inputs
		};

		if (isSickLeave !== null && isWorking !== null && days) {
			setIsDisabled(false);

			try {
				axios.post(BOT_URL, data);
			} catch (error) {
				console.error('Ошибка при отправке запроса:', error);
			}

			handleAcceptAnswers({
				days,
				isSickLeave,
				isWorking
			});
			setDays('');
			setIsSickLeave(null);
			setIsWorking(null);
			setIsDisabled(true);
		}
	};

	useEffect(() => {
		if (isSickLeave !== null && isWorking !== null && days) {
			setIsDisabled(false);
		} else if (!days) {
			setIsDisabled(true);
		}
	}, [isSickLeave, isWorking, days]);

	return (
		<form className={styles['form']} onSubmit={handleSubmitClick}>
			<div className={styles['questions']}>
				<div>Взял ли ты больничный:</div>
				<div className={styles['answers']}>
					<Tab
						className={styles['tab']}
						clickHandler={() => setIsSickLeave(true)}
						type={'category'}
						isActive={isSickLeave === true}
					>
						{'Да'}
					</Tab>
					<Tab
						className={styles['tab']}
						clickHandler={() => setIsSickLeave(false)}
						type={'category'}
						isActive={isSickLeave === false}
					>
						{'Нет'}
					</Tab>
				</div>
				<div>Ты работаешь?</div>
				<div className={styles['answers']}>
					<Tab
						className={styles['tab']}
						clickHandler={() => setIsWorking(true)}
						type={'category'}
						isActive={isWorking === true}
					>
						{'Да'}
					</Tab>
					<Tab
						className={styles['tab']}
						clickHandler={() => setIsWorking(false)}
						type={'category'}
						isActive={isWorking === false}
					>
						{'Нет'}
					</Tab>
				</div>
			</div>
			<Textarea
				label={'Сколько дней планируешь болеть:'}
				placeholder={'Вписать кол-во дней'}
				value={days}
				onChange={handleDaysChange}
				className={styles['textarea']}
			/>
			<Button disabled={isDisabled} className={styles.submit}>
				Отправить
			</Button>
		</form>
	);
}

export default SickForm;
