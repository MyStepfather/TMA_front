import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import {CardProps} from 'pages/MyCard/Card/Card.props.ts';
import {RootState} from './store.ts';

export interface IsValid {
    first_name: boolean;
    last_name: boolean;
    birthday: boolean;
    position: boolean;
    phone: boolean;
    email: boolean;
    whatsapp_phone: boolean;
    company: boolean;
    company_link: boolean;
}

export interface Values {
    first_name: string;
    last_name: string;
    birthday: string;
    position: string;
    phone: string;
    email: string;
    whatsapp_phone: string;
    company: string;
    company_link: string;
}

export const INITIAL_STATE = {
	isValid: {
		first_name: true,
		last_name: true,
		birthday: true,
		position: true,
		phone: true,
		email: true,
		whatsapp_phone: true,
		company: true,
		company_link: true
	},
	values: {
		first_name: '',
		last_name: '',
		birthday: '',
		position: '',
		phone: '',
		email: '',
		whatsapp_phone: '',
		company: '',
		company_link: ''
	},
	isFormReadyToSubmit: false,
	isLoading: false,
	cards: [],
	activeCard: 0,
	isForm: true
};

export interface State {
    isValid: IsValid;
    values: Values;
    isFormReadyToSubmit: boolean;
	isLoading: boolean;
	cards: CardProps[];
	errorMessage?: string;
	activeCard: number;
	isForm: boolean;
}

const initialState: State = INITIAL_STATE;

export const createCard = createAsyncThunk<CardProps, {userId: number}, {state: RootState}>('card/createCard',
	async ({userId}, thunkAPI) => {
		const values = thunkAPI.getState().card.values;
		try {
			const {data} = await axios.post(`https://gefest-team.ru:8888/api/card?userId=${userId}`, values);
			return data;
		} catch (e) {
			console.log(e);
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);
export const getCards = createAsyncThunk<CardProps[], {userId: number}, {state: RootState}>('card/getCards',
	async ({userId}) => {
		try {
			const {data} = await axios.get(`https://gefest-team.ru:8888/api/cards?userId=${userId}`);
			return data;
		} catch (e) {
			console.log(e);
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);
export const updateCard = createAsyncThunk<CardProps, {cardId: number}, {state: RootState}>('card/updateCard',
	async ({cardId}, thunkAPI) => {
		const values = thunkAPI.getState().card.values;
		try {
			const {data} = await axios.patch(`https://gefest-team.ru:8888/api/card/${cardId}`, values);
			return data;
		} catch (e) {
			console.log(e);
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);
export const deleteCard = createAsyncThunk<number, {cardId: number}, {state: RootState, rejectValue: { message: string }}>('card/deleteCard',
	async ({cardId}, thunkAPI) => {
		try {
			await axios.delete<number>(`https://gefest-team.ru:8888/api/card/${cardId}`);
			return cardId;
		} catch (e) {
			console.log(e);
			if (e instanceof AxiosError) {
				return thunkAPI.rejectWithValue({message: e.response?.data.message});
			}
			return thunkAPI.rejectWithValue({ message: 'Delete request failed!' });
		}
	}
);
export const cardSlice = createSlice({
	name: 'card',
	initialState,
	reducers: {
		setValue: (state, action: PayloadAction<Partial<Values>>) => {
			state.values = {...state.values, ...action.payload};
		},
		updateInitialValues: (state, { payload }: PayloadAction<CardProps>) => {
			const {
				position,
				phone,
				email,
				whatsapp_phone,
				company,
				company_link
			} = payload;
			state.values = {
				...state.values,
				position,
				phone,
				email,
				whatsapp_phone,
				company,
				company_link
			};
		},
		deleteCard: (state, action: PayloadAction<number>) => {
			state.cards = state.cards.filter((_, index) => index !== action.payload);
		},
		clear: (state) => {
			state.values = initialState.values;
			state.isFormReadyToSubmit = false;
		},
		resetValidity: (state) => {
			state.isValid = initialState.isValid;
		},
		formCancel: (state) => {
			state.isForm = false;
		},
		formToggle: (state) => {
			state.isForm = !state.isForm;
		},
		changeActiveCard: (state, action: PayloadAction<number>) => {
			state.activeCard = action.payload;
		},
		submit: (state) => {
			const first_nameValidity = state.cards.length > 0 ? true : !!state.values.first_name?.trim().length;
			const last_nameValidity = state.cards.length > 0 ? true : !!state.values.last_name?.trim().length;
			const birthdayValidity = state.cards.length > 0 ? true : !!state.values.birthday;
			const positionValidity = !!state.values.position?.trim().length;
			const phoneValidity = !!state.values.phone?.trim().length;
			const emailValidity = !!state.values.email?.trim().length;
			const whatsapp_phoneValidity = !!state.values.whatsapp_phone?.trim().length;
			const companyValidity = !!state.values.company?.trim().length;
			const company_linkValidity = !!state.values.company_link;
			state.isValid = {
				first_name: first_nameValidity,
				last_name: last_nameValidity,
				birthday: birthdayValidity,
				position: positionValidity,
				phone: phoneValidity,
				email: emailValidity,
				whatsapp_phone: whatsapp_phoneValidity,
				company: companyValidity,
				company_link: company_linkValidity
			};
			state.isFormReadyToSubmit =
                first_nameValidity &&
                last_nameValidity &&
								birthdayValidity &&
                phoneValidity &&
                emailValidity &&
				positionValidity &&
				whatsapp_phoneValidity &&
				companyValidity &&
				company_linkValidity
			;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(createCard.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(createCard.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isForm = false;
			state.cards.push(action.payload);
		});
		builder.addCase(createCard.rejected, (state, action) => {
			state.errorMessage = action.error.message;
			state.isLoading = false;
		});
		builder.addCase(getCards.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getCards.fulfilled, (state, action) => {
			state.cards = action.payload;
			state.isLoading = false;
			state.isForm = state.cards.length <= 0;

		});
		builder.addCase(getCards.rejected, (state, action) => {
			state.errorMessage = action.error.message;
			state.isLoading = false;
		});
		builder.addCase(deleteCard.fulfilled, (state, action) => {
			if (state.cards.length > 0) {
				state.cards.filter(card => card.id !== action.payload);
			} else {
				state.isForm = true;
			}
		});
		builder.addCase(deleteCard.rejected, (state, action) => {
			state.errorMessage = action.error.message;
		});
	}
});

export const { actions: cardActions, reducer: cardReducer } = cardSlice;
