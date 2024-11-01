import styles from './RequisitesItem.module.css';
import { RequisitesItemProps } from './RequisitesItem.props.ts';
import RequisiteLine from './RequisiteLine/RequisiteLine.tsx';
import Downloader from '../../../components/Downloader/Downloader.tsx';
import { useEffect, useState } from 'react';
import ExpanderButton from '../../../components/ExpanderButton/ExpanderButton.tsx';
import cn from 'classnames';
import { Toast } from 'components/Toast/Toast.tsx';

function RequisitesItem(props: RequisitesItemProps) {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const [message, setMessage] = useState<string | null>(null);
	const [type, setType] = useState<'success' | 'error' | null>(null);

	const toggleExpanding = () => {
		setIsExpanded(prevState => !prevState);
	};

	const handleCopyPath = () => {
		navigator.clipboard
			.writeText(`${props.path}`)
			.then(() => {
				setMessage('Ссылка скопирована в буфер обмена');
				setType('success');
			})
			.catch(err => {
				setMessage('Ошибка копирования ссылки');
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
				<div className={styles['head']}>
					<div className={styles['left']}>
						<div className={styles['title']}>{props.title}</div>
						<div className={styles['date']}>{props.date}</div>
					</div>
					<div className={styles['right']}>
						<ExpanderButton
							onClick={() => toggleExpanding()}
							isExpanded={isExpanded}
						/>
						<Downloader onClick={handleCopyPath} />
					</div>
				</div>
				<div
					className={cn(styles['body'], {
						[styles['open']]: isExpanded
					})}
				>
					<div className={styles['requisiteLinesList']}>
						{props.entities.map((line, index) => {
							return <RequisiteLine key={index} {...line} />;
						})}
					</div>
				</div>
			</div>
			<Toast message={message} type={type} />
		</>
	);
}

export default RequisitesItem;
