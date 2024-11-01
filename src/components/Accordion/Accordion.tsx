import styles from './Accordion.module.css';
import cn from 'classnames';
import {useState} from 'react';
import {AccordionProps} from './Accordion.props.ts';
import ExpanderButton from '../../components/ExpanderButton/ExpanderButton.tsx';
import AccordionItem from '../../components/Accordion/AccordionItem/AccordionItem.tsx';

function Accordion({head, body}: AccordionProps) {

	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	const clickHandler = () => {
		setIsExpanded(prevState => !prevState);
	};

	return (
		<div className={styles['item']}>
			<div className={styles['head']}>
				<div className={styles['title']}>{head}</div>
				<div className={styles['toggler']}>
					<ExpanderButton onClick={clickHandler} isExpanded={isExpanded}/>
				</div>
			</div>
			<div className={cn(styles['body'], {
				[styles['open']]: isExpanded
			})}>
				<div className={styles['requisiteLinesList']}>
					{body.map((line, index) => {
						return <AccordionItem key={index} {...line}/>;
					})}
				</div>
			</div>
		</div>
	);
}

export default Accordion;