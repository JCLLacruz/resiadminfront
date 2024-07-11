import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import residentService from './residentService';
import { initialStateResidentSliceInterface } from '../../interfaces/residentInterfaces';

const initialState: initialStateResidentSliceInterface = {
	resident: null,
	residents: [],
	isLoading: true,
	isSuccess: false,
	isError: false,
	error: null,
	msg: null,
};

export const getAllResidents = createAsyncThunk('residents/getAllResidents', async (_, thunkAPI: any) => {
    try {
        return await residentService.getAllResidents();
    } catch (error: any) {
        const errorMessage: string = error.response.data.msg;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});
export const getResidentById = createAsyncThunk('residents/getResidentById', async (id: any, thunkAPI: any) => {
    try {
        return await residentService.getResidentById(id);
    } catch (error: any) {
        const errorMessage: string = error.response.data.msg;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

const residentSlice = createSlice({
	name: 'resident',
	initialState,
	reducers: {
		reset: (state: any) => {
			state.activity = null;
			state.activities = [];
			state.isLoading = true;
			state.isSuccess = false;
			state.isError = false;
			state.error = null;
			state.msg = null;
		},
        resetLoading: (state: any) => {
            state.isLoading = true;
        },
	},
	extraReducers: (builder: any) => {
		builder
			.addCase(getAllResidents.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
                state.isSuccess = false;
			})
			.addCase(getAllResidents.pending, (state: any) => {
				state.isError = false;
                state.isSuccess = false;
				state.isLoading = true;
			})
			.addCase(getAllResidents.fulfilled, (state: any, action: any) => {
				state.residents = action.payload.residents;
				state.msg = action.payload.msg;
				state.isLoading = false;
                state.isSuccess = true;
			})
			.addCase(getResidentById.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
                state.isSuccess = false;
			})
			.addCase(getResidentById.pending, (state: any) => {
				state.isError = false;
                state.isSuccess = false;
				state.isLoading = true;
			})
			.addCase(getResidentById.fulfilled, (state: any, action: any) => {
				state.resident = action.payload.resident;
				state.msg = action.payload.msg;
				state.isLoading = false;
                state.isSuccess = true;
			})
	},
});

export const {reset, resetLoading} = residentSlice.actions;

export default residentSlice.reducer;
