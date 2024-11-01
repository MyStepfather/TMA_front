import styles from './Header.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/user.context.tsx';
import { useTelegram } from '../../hooks/useTelegram.ts';

function Header() {
	const location = useLocation();
	const navigate = useNavigate();
	const [HeaderBtn, setHeaderBtn] = useState<string>('');
	const context = useContext(UserContext);
	if (!context) {
		throw new Error(
			'UserContext must be used within a UserContextProvider'
		);
	}
	const { photoUrl, username } = useTelegram();

	useEffect(() => {
		if (location.pathname === '/') {
			setHeaderBtn('/icons/logo.svg');
		} else {
			setHeaderBtn('/icons/button_goback.svg');
		}
	}, [location.pathname]);

	const clickHandler = (): void => {
		if (location.pathname === '/') {
			return;
		}
		navigate(-1);
	};

	return (
		<div className={styles['header']}>
			<img
				className={styles['button']}
				src={HeaderBtn}
				alt="Кнопка назад"
				onClick={clickHandler}
			/>
			{photoUrl ? (
				<img src={photoUrl} alt="Ваше фото" className={styles.avatar} />
			) : (
				<div>{username}</div> 
			)}
		</div>
	);
}

export default Header;
