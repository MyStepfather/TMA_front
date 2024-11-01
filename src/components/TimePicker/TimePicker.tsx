import styles from './TimePicker.module.css';
import cn from 'classnames';
import { TimePickerProps } from './TimePicker.props.ts';
import { forwardRef, useCallback, useEffect } from 'react';

export const TimePickerInput = forwardRef<HTMLInputElement, TimePickerProps>(
	({ value, onChange, label, className, ...props }, ref) => {
		const setFocus = useCallback(() => {
			if (
				ref &&
				'current' in ref &&
				typeof ref.current?.showPicker === 'function'
			) {
				ref.current?.showPicker();
			}
		}, [ref]);

		useEffect(() => {
			if (ref && 'current' in ref) {
				ref.current?.addEventListener('click', setFocus);
			}
			return () => {
				if (ref && 'current' in ref) {
					ref.current?.removeEventListener('click', setFocus);
				}
			};
		}, [ref, setFocus]);

		return (
			<div className={styles['timePicker']}>
				{label && <div className={styles['label']}>{label}</div>}
				<input
					type="time"
					className={cn(styles['input'], className)}
					value={value}
					onChange={onChange}
					ref={ref}
					{...props}
				/>
			</div>
		);
	}
);