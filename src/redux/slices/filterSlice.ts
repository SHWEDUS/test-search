import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface FilterSliceState {
	searchValue: string;
	currentPage: number;
}

const initialState: FilterSliceState = {
	searchValue: '',
	currentPage: 1
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setFilters: (state, action: PayloadAction<FilterSliceState>) => {
			state.currentPage = Number(action.payload.currentPage);
		},
		setSearchValue: (state, action) => {
			state.searchValue = action.payload;
		}
	}
});

export const selectFilter = (state: RootState) => state.filter;

export const { setCurrentPage, setFilters, setSearchValue } =
	filterSlice.actions;

export default filterSlice.reducer;
