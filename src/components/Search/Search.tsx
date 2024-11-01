import { forwardRef, InputHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Search.module.css';

const Search = forwardRef<
	HTMLInputElement,
	InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
	return (
		<div className={styles['search']}>
			<img
				className={styles['icon']}
				src="/icons/search.svg"
				alt="Поиск"
			/>
			<input
				ref={ref}
				className={cn(styles['input'], className)}
				{...props}
			/>
		</div>
	);
});

export default Search;
