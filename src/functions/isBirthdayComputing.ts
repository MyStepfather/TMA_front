export function isBirthdayComputing(date: string | undefined) {
	if (date) {
		const dateNow = new Date().toDateString();
		return dateNow === date;
	}
	return false;
}