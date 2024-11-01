import {FullPageWidthWrapperType} from './FullPageWidthWrapper.types.ts';
import styles from './FullPageWidthWrapper.module.css';
import cn from 'classnames';

function FullPageWidthWrapper({children, className}: FullPageWidthWrapperType) {
	return (
		<div className={cn(styles['wrapper'], className)}>
			{children}
		</div>
	);
}

export default FullPageWidthWrapper;