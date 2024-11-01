import styles from './Checkbox.module.css';
import cn from 'classnames';
import { CheckboxProps } from './Checkbox.props.ts';

function Checkbox({ title, id, isChecked, onFilterChange }: CheckboxProps) {
	const handleChange = () => {
		onFilterChange(id);
	};

	return (
		<label className={styles['checkbox']}>
			{title}
			<div className={styles['box']}>
				<input
					type="checkbox"
					checked={isChecked}
					onChange={handleChange}
				/>
				<img
					className={cn(styles['check'], {
						[styles['hide']]: !isChecked
					})}
					src="/icons/check.svg"
					alt="Выбрано"
				/>
			</div>
		</label>
	);
}

export default Checkbox;
