import {HeadingTitleProps} from './HeadingTitle.props.ts';
import styles from './HeadingTitle.module.css';
function HeadingTitle({children}: HeadingTitleProps) {
	return (
		<h1 className={styles['title']}>
			{children}
		</h1>
	);
}

export default HeadingTitle;