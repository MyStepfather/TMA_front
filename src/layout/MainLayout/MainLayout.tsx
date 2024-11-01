import styles from './MainLayout.module.css';
import Header from '../../components/Header/Header.tsx';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useTelegram } from 'hooks/useTelegram.ts';

function MainLayout() {
	const { tg } = useTelegram();

	useEffect(() => {
		tg.ready();
		tg.expand();
	}, []);

	return (
		<>
			<Header />
			<div className={styles['layout']}>
				<div className={styles['content']}>
					<Outlet />
				</div>
			</div>
		</>
	);
}

export default MainLayout;
