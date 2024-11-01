import styles from './DeviceItem.module.css';
import cn from 'classnames';
import {DeviceItemProps} from 'pages/Devices/DeviceItem/DeviceItem.props.ts';
import {Link} from 'react-router-dom';
function DeviceItem({id, title, thumb}: DeviceItemProps) {
	return (
		<Link to={`/device/${id}`}>
			<div className={cn(styles['item'])}>
				<div className={styles['wrapper']}>
					<div className={styles['img_wrapper']}>
						<img className={styles['thumb']} src={thumb} alt="Иконка оборудования"/>
					</div>
					<p className={styles['title']}>{title}</p>
				</div>
				<img className={styles['arrow']} src="/icons/arrow_right_orn.svg" alt="Стрелка вправо"/>
			</div>
		</Link>
	);
}

export default DeviceItem;