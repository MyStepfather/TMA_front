import styles from './Record.module.css';
import {RecordProps} from 'pages/MyCard/Card/Record/Record.props.ts';
import cn from 'classnames';

function Record({icon, title, className}: RecordProps) {
	return (
		<div className={cn(styles['record'], className)}>
			<img className={styles['icon']} src={icon} alt="Иконка"/>
			<div className={styles['title']}>{title}</div>
		</div>
	);
}

export default Record;