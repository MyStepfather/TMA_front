import styles from './RequisiteLine.module.css';
import { RequisiteLineProps } from './RequisiteLine.props.ts';
import copyIcon from '../../../../../public/icons/send.svg';
import { useEffect, useState } from 'react';
import { Toast } from 'components/Toast/Toast.tsx';

function RequisiteLine({ title, value }: RequisiteLineProps) {
	const [message, setMessage] = useState<string | null>(null);
	const [type, setType] = useState<'success' | 'error' | null>(null);

	const handleCopyText = () => {
		navigator.clipboard
			.writeText(`${title} ${value}`)
			.then(() => {
				setMessage('Данные скопированы в буфер обмена');
				setType('success');
			})
			.catch(err => {
				setMessage('Ошибка копировании данных');
				setType('error');
				console.error(err);
			});
	};

	useEffect(() => {
		const timerId = setTimeout(() => {
			setMessage(null);
			setType(null);
		}, 2000);
		return () => clearTimeout(timerId);
	}, [message, type]);

	return (
		<>
			<div className={styles['item']}>
				<div className={styles['body']}>
					<div className={styles['title']}>{title}</div>
					<div className={styles['value']}>{value}</div>
				</div>
				<img
					className={styles.copyIcon}
					src={copyIcon}
					alt="иконка копирования"
					onClick={handleCopyText}
				/>
			</div>
			<Toast message={message} type={type} />
		</>
	);
}

export default RequisiteLine;
