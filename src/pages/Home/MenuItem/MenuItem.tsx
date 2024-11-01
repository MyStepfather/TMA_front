import styles from './MenuItem.module.css';
import {MenuItemProps} from './MenuItem.props.ts';
import {NavLink} from 'react-router-dom';
function MenuItem(props: MenuItemProps) {
	return (
		<NavLink to={props.path} className={styles['link']}>
			<div className={styles['item']}>
				<img className={styles['icon']} src={props.image} alt="Реквизиты"/>
				<p className={styles['title']}>{props.title}</p>
			</div>
		</NavLink>
	);
}

export default MenuItem;