import styles from './ExpanderButton.module.css';
import cn from 'classnames';
import {ExpanderButtonProps} from './ExpanderButton.props.ts';
function ExpanderButton({isExpanded, className, ...props}: ExpanderButtonProps) {
	return (
		<div className={cn(styles['expander'], className)} {...props}>
			<img className={cn(styles['arrow'], {
				[styles['open']]: isExpanded
			})} src="/icons/arrow_left.svg" alt="Развернуть"/>
		</div>
	);
}

export default ExpanderButton;