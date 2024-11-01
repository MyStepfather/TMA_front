export interface CalendarItemProps {
	id: number;
	date?: string;
	label?: string;
	title: string;
	isBirthday?: boolean;
	type: null | 'birthday';
}
