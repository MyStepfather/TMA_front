import styles from './Question.module.css';
import Tab from '../Tab/Tab.tsx';
import IQuestion from '../../interfaces/IQuestion.ts';
import {useState} from 'react';

function Question({question, answers}: IQuestion) {

	const [selectedTab, setSelectedTab] = useState<string>('');

	const handleTabClick = (value: string) => {
		setSelectedTab(value);
	};

	return (
		<div className={styles['question']}>
			<div>{question}</div>
			<div className={styles['answers']}>
				{answers.map((answer, index) => {
					return (
						<Tab
							key={index}
							className={styles['tab']}
							clickHandler={() => handleTabClick(answer.value)}
							type={'category'}
							isActive={answer.value === selectedTab}>{answer.label}
						</Tab>
					);
				})}
			</div>
		</div>
	);
}

export default Question;