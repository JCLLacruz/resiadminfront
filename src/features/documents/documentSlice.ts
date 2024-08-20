import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import documentService from './documentService';
import { InitialStateDocumentSliceInterface } from '../../interfaces/documentinterfaces';
import { MonthResumeValuesInterface } from '../../interfaces/activityIntefaces';

const initialState: InitialStateDocumentSliceInterface = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	error: null,
	msg: null,
};
export const monthResume = createAsyncThunk('document/monthResume', async (values: MonthResumeValuesInterface, thunkAPI: any) => {
	try {
		return await documentService.monthResume(values);
	} catch (error: any) {
		const errorMessage: string = error.response.data.msg;
		return thunkAPI.rejectWithValue(errorMessage);
	}
});
const documentSlice = createSlice({
	name: 'document',
	initialState,
	reducers: {
		reset: (state: any) => {
			state.isLoading = true;
			state.isSuccess = false;
			state.isError = false;
			state.error = null;
			state.msg = null;
		},
        resetError: (state: any) => {
            state.isError = false;
        },
		resetSuccess: (state: any) => {
			state.isSuccess = false;
		}
	},
	extraReducers: (builder: any) => {
		builder
			.addCase(monthResume.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
                state.isSuccess = false;
			})
			.addCase(monthResume.pending, (state: any) => {
				state.isError = false;
				state.isLoading = true;
                state.isSuccess = false;
			})
			.addCase(monthResume.fulfilled, (state: any, action: any) => {
				state.msg = action.payload.msg;
				state.isLoading = false;
                state.isSuccess = true;
			});
	},
});

export const { reset, resetSuccess, resetError } = documentSlice.actions;

export default documentSlice.reducer;
