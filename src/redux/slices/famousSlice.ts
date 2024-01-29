import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { FamousResponse } from '../../models/FamousResponse';

export type FetchFamousArgs = {
	search: string;
	currentPage: number;
};

export const fetchFamous = createAsyncThunk<FamousResponse[], FetchFamousArgs>(
	'famous/fetchFamous',
	async params => {
		const { search, currentPage } = params;
		const { data } = await axios.get<FamousResponse[]>(
			`https://65a6cc5974cf4207b4f0d408.mockapi.io/famous?page=${currentPage}&limit=3${search}&order=desc`
		);
		return data;
	}
);

enum Status {
	LOADING = 'loading',
	ERROR = 'error',
	SUCCESS = 'success'
}

interface FamousSliceState {
	items: FamousResponse[];
	status: Status;
}

const initialState: FamousSliceState = {
	items: [],
	status: Status.LOADING
};

export const famousSlice = createSlice({
	name: 'famous',
	initialState,
	reducers: {
		setItems: (state, action: PayloadAction<FamousResponse[]>) => {
			state.items = action.payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchFamous.fulfilled, (state, action) => {
			state.status = Status.SUCCESS;
			state.items = action.payload;
		});
		builder.addCase(fetchFamous.pending, state => {
			state.status = Status.LOADING;
			state.items = [];
		});
		builder.addCase(fetchFamous.rejected, state => {
			state.status = Status.ERROR;
			state.items = [];
		});
	}
});

export const selectFamousData = (state: RootState) => state.famous;

export const { setItems } = famousSlice.actions;

export default famousSlice.reducer;
