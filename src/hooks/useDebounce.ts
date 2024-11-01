import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay: number = 500): string => {
	const [debounced, setDebounced] = useState('');

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebounced(value);
		}, delay);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debounced;
};
