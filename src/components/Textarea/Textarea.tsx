import styles from './Textarea.module.css';
import {TextareaProps} from './Textarea.props.ts';
import cn from 'classnames';

function Textarea({value, onChange, className, label, ...props}: TextareaProps)  {
	return (
		<div className={styles['input']}>
			{label && <div className={styles['label']}>{label}</div>}
			<textarea
				className={cn(styles['textarea'], className)}
				value={value}
				onChange={onChange}
				{...props}
			/>
		</div>
	);
}

export default Textarea;