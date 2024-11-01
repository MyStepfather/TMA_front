import styles from './AddCardForm.module.css';
import Input from '../../../components/Input/Input.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store.ts';
import {
	cardActions,
	createCard,
} from '../../../store/card.slice.ts';
import {
	ChangeEvent,
	FC,
	FormEvent,
	useContext,
	useEffect,
	useState
} from 'react';
import Button from '../../../components/Buttton/Button.tsx';
import { AxiosError } from 'axios';
import { UserContext } from '../../../context/user.context.tsx';
import { Toast } from 'components/Toast/Toast.tsx';
import { useTelegram } from 'hooks/useTelegram.ts';

interface AddCardFormProps {
	handleRotateCard: () => void;
}

export const AddCardForm: FC<AddCardFormProps> = ({handleRotateCard}) => {
	const [message, setMessage] = useState<string | null>(null);
	const [type, setType] = useState<'success' | 'error' | null>(null);
	const dispatch = useDispatch<AppDispatch>();
	const { photoUrl } = useTelegram();

	const { cards, isValid, values, isFormReadyToSubmit } = useSelector(
		(s: RootState) => s.card
	);
	const context = useContext(UserContext);
	if (!context) {
		throw new Error(
			'UserContext must be used within a UserContextProvider'
		);
	}
	const { user } = context;

	const createAndClearCard = async () => {
		try {
			if (user && user.id !== undefined) {
				await dispatch(createCard({ userId: user.id }));
				setMessage('Карточка создана');
				setType('success');
			} else {
				setMessage('Ошибка при создании карточки');
				setType('error');
			}
			dispatch(cardActions.clear());
			handleRotateCard();
		} catch (e) {
			setMessage('Ошибка при создании карточки');
			setType('error');
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			} else {
				throw new Error('Пользователь не определен');
			}
		}
	};

	useEffect(() => {
		if (isFormReadyToSubmit) {
			createAndClearCard();
		}
	}, [isFormReadyToSubmit, values, user?.id]);

	const addCard = (e: FormEvent) => {
		e.preventDefault();
		dispatch(cardActions.submit());
	};

	const updateInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		dispatch(cardActions.setValue({ [name]: value }));
	};

	useEffect(() => {
		if (message !== null && type !== null) {
			const timerId = setTimeout(() => {
				setMessage(null);
				setType(null);
			}, 2000);
			return () => clearTimeout(timerId);
		}
	}, [message, type]);

	return (
		<>
			<form className={styles['form']} onSubmit={addCard}>
				<div className={styles['photoWrapper']}>
					<div className={styles['photoPart']}>
						{photoUrl ? (
							<img
								src={photoUrl}
								alt="Фото пользователя"
								className={styles['photo']}
							/>
						) : (
							<img
								src="/images/user_photo_undefined.png"
								className={styles['photo']}
								alt="Фото карточки"
							/>
						)}

						{/*<img onClick={addImage} src="/icons/plus_add.svg" className={styles['addPhoto']} alt="Добавить фото"/>*/}
					</div>
					{/*<div className={styles['photoText']}>Добавить фото</div>*/}
				</div>
				<div className={styles['userData']}>
					<div className="">Добавьте данные</div>
					<div className={styles['inputs']}>
						{cards.length == 0 && (
							<Input
								isValid={isValid.first_name}
								value={values.first_name}
								name="first_name"
								onInput={updateInput}
								type={'text'}
								placeholder="Имя"
							/>
						)}
						{cards.length == 0 && (
							<Input
								isValid={isValid.last_name}
								value={values.last_name}
								name="last_name"
								onChange={updateInput}
								type={'text'}
								placeholder="Фамилия"
							/>
						)}
						{cards.length == 0 && (
							<Input
								isValid={isValid.birthday}
								value={values.birthday}
								name="birthday"
								onChange={updateInput}
								type={'date'}
								placeholder="День рождения"
							/>
						)}
						<Input
							isValid={isValid.phone}
							value={values.phone}
							name="phone"
							onChange={updateInput}
							type={'text'}
							placeholder="Номер телефона"
						/>
						<Input
							isValid={isValid.email}
							value={values.email}
							name="email"
							onChange={updateInput}
							type={'text'}
							placeholder="Почта"
						/>
						<Input
							isValid={isValid.whatsapp_phone}
							value={values.whatsapp_phone}
							name="whatsapp_phone"
							onChange={updateInput}
							type={'text'}
							placeholder="Номер в WhatsApp"
						/>
					</div>
				</div>
				<div className={styles['userData']}>
					<div className="">Информация о компании</div>
					<div className={styles['inputs']}>
						<Input
							isValid={isValid.position}
							value={values.position}
							name="position"
							onChange={updateInput}
							type={'text'}
							placeholder="Должность"
						/>
						<Input
							isValid={isValid.company}
							value={values.company}
							name="company"
							onChange={updateInput}
							type={'text'}
							placeholder="Название компании"
						/>
						<Input
							isValid={isValid.company_link}
							value={values.company_link}
							name="company_link"
							onChange={updateInput}
							type={'text'}
							placeholder="Ссылка на компанию"
						/>
					</div>
				</div>
				<Button type="submit" className={styles['formButton']}>
					Создать карточку
				</Button>
			</form>
			<Toast message={message} type={type} />
		</>
	);
};
