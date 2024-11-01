import styles from './Card.module.css';
import Record from '../../../pages/MyCard/Card/Record/Record.tsx';
import { CardProps } from '../../../pages/MyCard/Card/Card.props.ts';
import { useTelegram } from 'hooks/useTelegram.ts';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store.ts';

const icons = {
	phone: '/icons/phone_icon.svg',
	email: '/icons/email_icon.svg',
	telegram: '/icons/tg_icon.svg',
	whatsapp: '/icons/whatsapp_icon.svg',
	undefined_avatar: '/images/user_photo_undefined.png'
};

function Card(props: CardProps) {
	const { photoUrl } = useTelegram();
	const { activeCard } = useSelector((s: RootState) => s.card);

	return (
		<div
			className={cn(styles.wrapper, {
				[styles.rotated]: props.isRotated && props.index === activeCard
			})}
		>
			<section className={styles.innerWrapper}>
				<div className={styles.front}>
					<div className={styles['mainData_wrapper']}>
						<img
							className={styles['userPhoto']}
							src={photoUrl || icons.undefined_avatar}
							alt="Фотография пользователя"
						/>
						<div className={styles['userName_wrapper']}>
							<div className={styles['name']}>
								{props.last_name} {props.first_name}
							</div>
							<div className={styles['prof']}>
								{props.position}
							</div>
						</div>
					</div>
					<div className={styles['infoWrapper']}>
						<img
							className={styles['logo']}
							src="/images/gefest_logo.png"
							alt=""
						/>
						<div className={styles['records']}>
							{props.phone && (
								<Record
									icon={icons.phone}
									title={props.phone}
								/>
							)}
							{props.email && (
								<Record
									icon={icons.email}
									title={props.email}
								/>
							)}
							{props.username && (
								<Record
									icon={icons.telegram}
									title={'@' + props.username}
								/>
							)}
							{props.whatsapp_phone && (
								<Record
									icon={icons.whatsapp}
									title={props.whatsapp_phone}
								/>
							)}
						</div>
					</div>
				</div>
				<div className={styles.back}>
					{props.qrcode ? (
						<div
							className={styles.qrcode}
							dangerouslySetInnerHTML={{
								__html: props.qrcode
							}}
						/>
					) : (
						<img
							src={photoUrl || icons.undefined_avatar}
							alt="qr-код"
						/>
					)}
				</div>
			</section>
		</div>
	);
}

export default Card;
