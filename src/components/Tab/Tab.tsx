import styles from './Tab.module.css';
import {TabProps} from './Tab.props.ts';
import cn from 'classnames';

function Tab({children, clickHandler, className, isActive, type, ...props}: TabProps) {

	return (
		<div onClick={clickHandler} className={cn(styles['tab'], className, {
			[styles['category']]: type === 'category',
			[styles['label']]: type === 'label',
			[styles['active']]: isActive,
			[styles['ghost']]: type === 'ghost',
			[styles['presentationOdd']]: type === 'presentationOdd',
			[styles['presentationEven']]: type === 'presentationEven'

		})} {...props}>
			{children}
		</div>
	);
}

export default Tab;