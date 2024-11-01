import { useState, useEffect } from 'react';

function useIsBirthday(dateString: string | undefined) {
	const [isBirthday, setIsBirthday] = useState(false);

	useEffect(() => {
		if (dateString) {
			const today = new Date().toISOString().split('T')[0]; // Получаем текущую дату в формате YYYY-MM-DD
			const birthday = new Date(dateString).toISOString().split('T')[0]; // Преобразуем dateString в тот же формат

			setIsBirthday(today === birthday); // Сравниваем даты и обновляем состояние
		}
	}, [dateString]);

	return isBirthday;
}

export default useIsBirthday;