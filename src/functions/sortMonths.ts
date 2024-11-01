import { TEvent } from 'types/types';

export const sortMonths = (array: TEvent[]): TEvent[] => {
  return array.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);

    if (aDate.getMonth() === bDate.getMonth()) {
      return aDate.getDate() - bDate.getDate();
    } else {
      return aDate.getMonth() - bDate.getMonth();
    }
  });
};
