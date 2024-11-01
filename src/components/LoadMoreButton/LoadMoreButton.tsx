import Button from '../../components/Buttton/Button';
import styles from './LoadMoreButton.module.css';
import { LoadMoreButtonProps } from './LoadMoreButton.props';
import { FC } from 'react';

export const LoadMoreButton: FC<LoadMoreButtonProps> = ({
	disabled,
	onClick
}) => {
	return (
		<Button
			disabled={disabled}
			onClick={onClick}
			className={styles['loadMore']}
		>
			Показать еще
		</Button>
	);
};
