import { useState, useEffect } from 'react';

type UseLocalizedMonthReturn = string;

const months = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь'
];

export const useLocalizedMonth = (
	monthNumber: number
): UseLocalizedMonthReturn => {
	const [localizedMonth, setLocalizedMonth] = useState<string>('');

	useEffect(() => {
		setLocalizedMonth(months[monthNumber - 1]);
	}, [monthNumber]);

	return localizedMonth;
};
