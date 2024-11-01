import { TEvent } from 'types/types';

export const filterTodaysEvents = (array: TEvent[]): TEvent[] => {
	return array.filter(event => {
		const currentDate = new Date().getDate();
		const currentMonth = new Date().getMonth() + 1;
		const [_, month, date] = event.date.split('-').map(Number);
		if (currentMonth === month && currentDate === date) {
			return event;
		}
	});
};
