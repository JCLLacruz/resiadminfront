import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import serverService from './serverService';
import { initialStateServerSliceInterface } from '../../interfaces/serverInterfaces';

const initialState: initialStateServerSliceInterface = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	error: null,
	msg: null,
};
export const serverStatus = createAsyncThunk('server/serverStatus', async (_, thunkAPI: any) => {
	try {
		return await serverService.serverStatus();
	} catch (error: any) {
		const errorMessage: string = error.response.data.msg;
		return thunkAPI.rejectWithValue(errorMessage);
	}
});
const serverSlice = createSlice({
	name: 'server',
	initialState,
	reducers: {
		reset: (state: any) => {
			state.isLoading = true;
			state.isSuccess = false;
			state.isError = false;
			state.error = null;
			state.msg = null;
		},
		resetSuccess: (state: any) => {
			state.isSuccess = false;
		}
	},
	extraReducers: (builder: any) => {
		builder
			.addCase(serverStatus.rejected, (state: any, action: any) => {
                console.log(action.payload);
                
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
                state.isSuccess = false;
			})
			.addCase(serverStatus.pending, (state: any) => {
				state.isError = false;
				state.isLoading = true;
                state.isSuccess = false;
			})
			.addCase(serverStatus.fulfilled, (state: any, action: any) => {
				state.msg = action.payload.msg;
				state.isLoading = false;
                state.isSuccess = true;
			});
	},
});

export const { reset, resetSuccess } = serverSlice.actions;

export default serverSlice.reducer;
