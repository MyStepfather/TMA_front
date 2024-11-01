export type OpozdunTabs = {
	id: number;
	title: string;
};

export type OpozdunFormProps = {
	handleAcceptAnswers: (obj: TAnswerVariations) => void;
	type: number;
};

export type TAnswerVariations = {
	reason?: string;
	time?: string;
	location?: string;
	isSickLeave?: boolean;
	isWorking?: boolean;
	days?: string;
	range?: Array<object>;
};

export type TAnswerObject = {
	user_id: number | null;
	opozdun_type_id: number | null;
	answer: TAnswerVariations;
};
