import styles from './Button.module.css';
import cn from 'classnames';
import {ButtonProps} from './Button.props.ts';
function Button({children, className, appearance, ...props}: ButtonProps) {
	return (
		<button className={cn(styles['button'], className, {
			[styles['ghost']]: appearance === 'ghost'
		})} {...props}>
			{children}
		</button>
	);
}

export default Button;