import styles from './AccordionItem.module.css';
import { AccordionItemProps } from './AccordionItem.props.ts';
import copyIcon from '../../../../public/icons/send.svg';

function AccordionItem({ title, description }: AccordionItemProps) {
	const handleCopyText = () => {
		navigator.clipboard.writeText(`${title} ${description}`);
	};

	return (
		<div className={styles['record']}>
			<div className={styles.body}>
				<div className={styles['title']}>{title}</div>
				<div className={styles['description']}>{description}</div>
			</div>
			<img
				className={styles.copyIcon}
				src={copyIcon}
				alt="Иконка копирования"
				onClick={handleCopyText}
			/>
		</div>
	);
}

export default AccordionItem;
