export default interface IQuestion {
	question: string;
	answers: {
		label: string;
		value: string;
	}[];
}
