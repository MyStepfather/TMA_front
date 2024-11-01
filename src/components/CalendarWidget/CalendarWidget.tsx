import {
	ClassNames,
	DateRange,
	DateRangePickerProps,
	Range
} from 'react-date-range';
import { ru } from 'date-fns/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import styles from './CalendarWidget.module.css';

interface CalendarWidgetProps {
	state: Range[];
	setState: (newRange: Range[]) => void;
}

function CalendarWidget({ state, setState }: CalendarWidgetProps) {
	const calendarStyles: ClassNames = {
		dateRangeWrapper: styles['body'],
		dateDisplayWrapper: styles['header'],
		yearPicker: styles['textSelect'],
		monthPicker: styles['textSelect'],
		dayNumber: styles['dayNumber'],
		month: styles['month'],
		weekDay: styles['weekDay'],
		dayToday: styles['dayToday'],
		startEdge: styles['startEdge'],
		inRange: styles['inRange'],
		endEdge: styles['endEdge']
	};

	const localeSettings: DateRangePickerProps['locale'] = ru;

	return (
		<DateRange
			editableDateInputs={true}
			onChange={item => setState([item.selection])}
			moveRangeOnFirstSelection={false}
			ranges={state}
			classNames={calendarStyles}
			locale={localeSettings}
		/>
	);
}

export default CalendarWidget;
