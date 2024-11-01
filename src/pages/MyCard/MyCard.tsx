import styles from './MyCard.module.css';
import HeadingTitle from '../../components/HeadingTitle/HeadingTitle.tsx';
import { AddCardForm } from '../../pages/MyCard/AddCardForm/AddCardForm.tsx';
import Card from '../../pages/MyCard/Card/Card.tsx';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/user.context.tsx';
import { Usage } from '../../pages/MyCard/Usage/Usage.tsx';
import Slider from '../../components/Slider/Slider.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store.ts';
import { cardActions, deleteCard, getCards } from '../../store/card.slice.ts';
import Button from '../../components/Buttton/Button.tsx';
import { EditCardForm } from './EditCardForm/EditCardForm.tsx';
import crossIcon from '../../../public/icons/cross.svg';
import { Confirm } from 'components/Confirm/Confirm.tsx';

function MyCard() {
	const dispatch = useDispatch<AppDispatch>();
	const {
		cards,
		isLoading,
		errorMessage: error,
		isForm,
		activeCard
	} = useSelector((s: RootState) => s.card);
	const context = useContext(UserContext);
	if (!context) {
		throw new Error(
			'UserContext must be used within a UserContextProvider'
		);
	}
	const { user } = context;
	const [_, setActiveIndexImage] = useState(0);
	const [isRotated, setIsRotated] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isConfirmVisible, setIsConfirmVisible] = useState(false);
	const [confirmText, setConfirmText] = useState<string>('');

	useEffect(() => {
		if (user && user.id !== undefined) {
			dispatch(getCards({ userId: user.id }));
		}
	}, [user, dispatch, isUpdating]);

	const handlerDeleteCard = () => {
		if (cards.length > 0) {
			const cardForDelete = cards.find((_, index) => {
				return index === activeCard;
			});
			if (cardForDelete?.id && user && user.id !== undefined) {
				setConfirmText('Вы точно хотите удалить карточку?');
				setIsConfirmVisible(true);
			}
		}
	};

	const handleConfirmDelete = async () => {
		setConfirmText('Ваша карточка успешно удалена');
		if (cards.length > 0) {
			const cardForDelete = cards.find((_, index) => {
				return index === activeCard;
			});
			dispatch(cardActions.deleteCard(activeCard));
			if (cardForDelete?.id && user && user.id !== undefined) {
				setIsConfirmVisible(false);
				setConfirmText('');
				await dispatch(deleteCard({ cardId: cardForDelete.id }));
				await dispatch(getCards({ userId: user.id }));
			}		
		}
	};

	const handleCancelDelete = () => {
		setIsConfirmVisible(false);
		setConfirmText('');
	};

	const handlerUpdateCard = () => {
		setIsUpdating((prev) => !prev);
		dispatch(cardActions.clear());
		setIsRotated(false);
	};

	const handleCancelUpdate = () => {
		dispatch(cardActions.clear());
    setIsUpdating(false);
    setIsRotated(false);
	}

	const handleCancelCreate = () => {
		dispatch(cardActions.formCancel());
    setIsRotated(false);
	}

	const onQrButtonClick = () => {
		setIsRotated(prev => !prev);
	};

	const handleBackToCards = () => {
		dispatch(cardActions.formToggle());
		setIsUpdating(false);
		setIsRotated(false);
	};

	const handleRotateCard = () => {
		setIsRotated(false);
	};

	return (
		<>
			<div className={styles['content']}>
				<HeadingTitle>
					{isUpdating ? (
						<div>Редактирование данных</div>
					) : (
						<div>Моя карточка</div>
					)}
					{cards.length > 0 && !isUpdating && !isForm && (
						<div className={styles['settings']}>
							<img
								onClick={handlerUpdateCard}
								className={styles.editButton}
								src="/icons/edit.svg"
								alt="Редактировать"
							/>
							<img
								onClick={handlerDeleteCard}
								className={styles.deleteButton}
								src="/icons/delete.svg"
								alt="Удалить"
							/>
						</div>
					)}
					{cards.length > 0 && !isUpdating && isForm && (
						<div className={styles['settings']}>
							<div className={styles.iconWrapper}>
								<img
									onClick={handleCancelCreate}
									className={styles.cancelButton}
									src={crossIcon}
									alt="Отменить создание"
								/>
							</div>
						</div>
					)}
					{cards.length > 0 && isUpdating && (
						<div className={styles['settings']}>
							<div className={styles.iconWrapper}>
								<img
									onClick={handleCancelUpdate}
									className={styles.cancelButton}
									src={crossIcon}
									alt="Отменить редактирование"
								/>
							</div>
						</div>
					)}
				</HeadingTitle>
				{isLoading && <>Загружаем карточки...</>}
				{error && <>{error}</>}
				{!isLoading && isForm && (
					<AddCardForm handleRotateCard={handleRotateCard} />
				)}
				{!isLoading && !isForm && isUpdating && (
					<EditCardForm
						isUpdating={isUpdating}
						activeCard={activeCard}
						handlerUpdateCard={handlerUpdateCard}
					/>
				)}
				{!isLoading && !isForm && !isUpdating && (
					<div className={styles['cards']}>
						<Slider
							setActiveIndexImage={setActiveIndexImage}
							slides={cards.map((card, index) => (
								<Card
									key={card.id}
									{...card}
									index={index}
									isRotated={isRotated}
									isUpdating={isUpdating}
								/>
							))}
						/>
					</div>
				)}
				{!isLoading && !isForm && !isUpdating && (
					<Usage
						onQrButtonClick={onQrButtonClick}
						isRotated={isRotated}
					/>
				)}
				{!isLoading && isForm && cards.length > 0 && (
					<Button onClick={handleBackToCards} appearance={'ghost'}>
						Вернуться к карточкам
					</Button>
				)}
			</div>
			<Confirm
				text={confirmText}
				isVisible={isConfirmVisible}
				onConfirm={handleConfirmDelete}
				onCancel={handleCancelDelete}
			/>
		</>
	);
}

export default MyCard;
