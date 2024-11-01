import styles from './Opozdun.module.css';
import { useCallback, useContext, useEffect, useState } from 'react';
import LaterForm from './OpozdunForms/LaterForm/LaterForm.tsx';
import SickForm from './OpozdunForms/SickForm/SickForm.tsx';
import BusinessForm from './OpozdunForms/BusinessForm/BusinessForm.tsx';
import DistantForm from './OpozdunForms/DistantForm/DistantForm.tsx';
import FreeDayForm from './OpozdunForms/FreeDayForm/FreeDayForm.tsx';
import VacantForm from './OpozdunForms/VacantForm/VacantForm.tsx';
import LateForm from './OpozdunForms/LateForm/LateForm.tsx';
import HeadingTitle from '../../components/HeadingTitle/HeadingTitle.tsx';
import Tab from '../../components/Tab/Tab.tsx';
import { opozdunTabs } from '../../constants/opozdunTabs.ts';
import { UserContext } from '../../context/user.context.tsx';
import api from '../../api/axios.ts';
import { AxiosError } from 'axios';
import { TAnswerObject, TAnswerVariations } from './Opozdun.types.ts';

function Opozdun() {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error(
			'UserContext must be used within a UserContextProvider'
		);
	}
	const { user } = context;
	const [activeTabId, setActiveTabId] = useState<number>(opozdunTabs[0].id);
	const [userAnswers, setUserAnswers] = useState<TAnswerObject>({
		user_id: null,
		opozdun_type_id: opozdunTabs[0].id,
		answer: {}
	});
	const [error, setError] = useState<string>('');

	useEffect(() => {
		if (user) {
			setUserAnswers(prev => ({
				...prev,
				user_id: user.id as number
			}));
		}
	}, [user]);

	const sendAnswers = async (): Promise<TAnswerObject | undefined> => {
		try {
			const { data } = await api.post('/opozdun', userAnswers);
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.response?.data.message);
				throw new Error(e.response?.data.message);
			}
			return;
		}
	};

	const handleTabClick = (tabId: number) => {
		setActiveTabId(tabId);
		setUserAnswers(prev => {
			return {
				...prev,
				opozdun_type_id: tabId,
				answer: {}
			};
		});
	};

	const handleAcceptAnswers = useCallback((obj: TAnswerVariations) => {
		setUserAnswers(prev => ({
			...prev,
			answer: {
				...obj
			}
		}));
	}, []);

	useEffect(() => {
		if (
			userAnswers.user_id !== null &&
			userAnswers.opozdun_type_id !== null &&
			Object.keys(userAnswers.answer).length > 0
		) {
			sendAnswers();
		}
	}, [userAnswers, sendAnswers]);

	if (error) {
		alert(error);
	}

	return (
		<div className={styles['content']}>
			<HeadingTitle>Бот Опоздун</HeadingTitle>
			<div className={styles['tabsList']}>
				{opozdunTabs.map(tab => {
					return (
						<Tab
							key={tab.id}
							className={styles['tab']}
							clickHandler={() => {
								handleTabClick(tab.id);
							}}
							isActive={tab.id === activeTabId}
							type={'category'}
						>
							{tab.title}
						</Tab>
					);
				})}
			</div>
			{activeTabId === 1 && (
				<LaterForm handleAcceptAnswers={handleAcceptAnswers} type={activeTabId} />
			)}
			{activeTabId === 2 && (
				<LateForm handleAcceptAnswers={handleAcceptAnswers} type={activeTabId} />
			)}
			{activeTabId === 3 && (
				<SickForm handleAcceptAnswers={handleAcceptAnswers} type={activeTabId} />
			)}
			{activeTabId === 4 && (
				<DistantForm handleAcceptAnswers={handleAcceptAnswers} type={activeTabId} />
			)}
			{activeTabId === 5 && (
				<BusinessForm handleAcceptAnswers={handleAcceptAnswers} type={activeTabId} />
			)}
			{activeTabId === 6 && (
				<VacantForm handleAcceptAnswers={handleAcceptAnswers} type={activeTabId} />
			)}
			{activeTabId === 7 && (
				<FreeDayForm handleAcceptAnswers={handleAcceptAnswers} type={activeTabId} />
			)}
		</div>
	);
}

export default Opozdun;
