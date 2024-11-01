import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import {CardProps} from 'pages/MyCard/Card/Card.props.ts';
import {RootState} from './store.ts';

export const INITIAL_STATE = {
	username: '',
	first_name: '',
	last_name: '',
	avatar: ''
};

export interface State {
	username: string
	first_name: string
	last_name: string
	avatar: string
}

const initialState: State = INITIAL_STATE;

export const getUserData = createAsyncThunk<CardProps, {userId: number}, {state: RootState}>('user/getUserData',
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

export const userSlice = createSlice({
	name: 'card',
	initialState,
	reducers: {
		// setValue: (state, action: PayloadAction<Partial<Values>>) => {
		// 	state.values = {...state.values, ...action.payload};
		// },
	},
	extraReducers: () => {

		// builder.addCase(deleteCard.rejected, (state, action) => {
		// 	state.errorMessage = action.error.message;
		// });
	}
});

export const { actions: userActions, reducer: userReducer } = userSlice;
