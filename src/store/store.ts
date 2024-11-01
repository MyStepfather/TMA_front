import { configureStore } from '@reduxjs/toolkit';
import { cardReducer } from './card.slice.ts';
import { userReducer } from './user.slice.ts';

export const store = configureStore({
	reducer: {
		card: cardReducer,
		user: userReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
