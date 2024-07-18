import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import sessionService from './sessionService';
import { initialStateSessionSliceInterface } from '../../interfaces/sessionInterfaces';

const initialState: initialStateSessionSliceInterface = {
	session: null,
	sessions: [],
	isLoading: true,
	isSuccess: false,
	isError: false,
	error: null,
	msg: null,
};

export const getAllSessions = createAsyncThunk('sessions/getAllSessions', async (_, thunkAPI) => {
	try {
		return await sessionService.getAllSessions();
	} catch (error: any) {
		const errorMessage: string = error.response.data.msg;
		return thunkAPI.rejectWithValue(errorMessage);
	}
});
export const createSession = createAsyncThunk('sessions/createSession', async (session: any, thunkAPI) => {
	try {
		return await sessionService.createSession(session);
	} catch (error: any) {
		const errorMessage: string = error.response.data.msg;
		return thunkAPI.rejectWithValue(errorMessage);
	}
});

const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		reset: (state: any) => {
			state.session = null;
			state.sessions = [];
			state.isLoading = true;
			state.isSuccess = false;
			state.isError = false;
			state.error = null;
			state.msg = null;
		},
	},
	extraReducers: (builder: any) => {
		builder
			.addCase(getAllSessions.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
			})
			.addCase(getAllSessions.pending, (state: any) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(getAllSessions.fulfilled, (state: any, action: any) => {
				state.sessions = action.payload.sessions;
				state.msg = action.payload.msg;
				state.isLoading = false;
			});
	},
});

export const { reset } = sessionSlice.actions;

export default sessionSlice.reducer;
