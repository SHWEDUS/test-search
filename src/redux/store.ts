import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import famous from './slices/famousSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
	reducer: {
		filter,
		famous
	}
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
