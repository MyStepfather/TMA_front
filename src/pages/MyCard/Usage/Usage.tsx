import styles from './Usage.module.css';
import Button from '../../../components/Buttton/Button.tsx';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store.ts';
import { cardActions } from '../../../store/card.slice.ts';
import { FC } from 'react';
import qrIcon from '../../../../public/icons/qr_icon.svg';
import profileIcon from '../../../../public/icons/profile_card.svg';

interface UsageProps {
	onQrButtonClick: () => void;
	isRotated: boolean;
}

export const Usage: FC<UsageProps> = ({ onQrButtonClick, isRotated }) => {
	const dispatch = useDispatch<AppDispatch>();

	return (
		<div className={styles.downerWrapper} onClick={() => onQrButtonClick()}>
			<div
				className={styles.downerCentralBtn}
			>
				{isRotated ? (
					<img src={profileIcon} alt="profileIcon" />
				) : (
					<img src={qrIcon} alt="Qr-код" />
				)}
			</div>
			{/* <div className={styles['downerButtons']}>
				<Button className={styles['downerButton']}>
					<img src="/icons/watch.svg" alt="Посмотреть" />
					Посмотреть
				</Button>
				<Button className={styles['downerButton']}>
					<img src="/icons/send.svg" alt="Отправить" />
					Отправить
				</Button>
			</div> */}
			<Button
				onClick={() => dispatch(cardActions.formToggle())}
				className={styles['createMoreBtn']}
				appearance={'ghost'}
			>
				Создать еще карточку
			</Button>
		</div>
	);
};