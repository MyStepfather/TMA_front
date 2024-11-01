import { FC, useEffect, useState } from 'react';
import styles from './Toast.module.css';
import cn from 'classnames';
import iconSuccess from '../../../public/icons/check_white.svg';
import iconError from '../../../public/icons/cross.svg';

export interface ToastProps {
	message: string | null;
	type: 'success' | 'error' | null;
	duration?: number;
}

export const Toast: FC<ToastProps> = ({ message, type, duration = 1500 }) => {
	const [isShown, setIsShown] = useState(false);
	const toastDuration = '500ms';

	useEffect(() => {
		if (!message || !type) {
			return;
		} else {
			setIsShown(true);
		}

		const timerId = setTimeout(() => {
			setIsShown(false);
		}, duration);
		return () => clearTimeout(timerId);
	}, [message, type, duration]);

	return (
		<div
			className={cn(styles.wrapper, {
				[styles.success]: type === 'success',
				[styles.error]: type === 'error',
				[styles.show]: isShown
			})}
			style={{
				transitionDuration: toastDuration,
			}}
		>
			<div className={styles.content}>
				<img
					className={styles.icon}
					src={type === 'success' ? iconSuccess : iconError}
					alt="иконка"
				/>
				<span className={styles.message}>{message}</span>
			</div>
		</div>
	);
};
