export type TCategory = {
	id: number;
	title: string;
	category_type_id?: number;
};

export type TPresentation = {
	id: number;
	category_id: number[];
	path: string;
	title: string;
	created_at: string;
	updated_at: string;
};

export type TPresentationResponse = {
	current_page: number;
	data: TPresentation[];
	first_page_url: string;
	from: number;
	next_page_url: string;
	path: string;
	per_page: number;
	prev_page_url: string | null;
	to: number;
};

export type TCompany = {
	id: number;
	name: string;
	created_at?: string;
	updated_at?: string;
};

export type TQueryParams = {
	searchValue: string;
	categoriesId: string;
	companyId: number;
	page: number;
	perPage: number;
};

export type TEvent = {
	id: number;
	title: string;
	date: string;
	type: null | 'birthday';
	isActive: number;
	created_at: string;
	updated_at: string;
};

export type TAnswer = {
	user: string;
}

export type TelegramBotData = {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
}