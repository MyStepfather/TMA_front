import styles from './Input.module.css';
import {InputProps} from '../../components/Input/Input.props.ts';
import {forwardRef} from 'react';
import cn from 'classnames';

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({type, className, isValid, ...props}, ref) {
	return (
		<input ref={ref} type={type} className={cn(styles['input'], className, {
			[styles['invalid']]: !isValid
		})} {...props}/>
	);
});

export default Input;