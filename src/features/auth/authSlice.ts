import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';
import { initialStateAuthSliceInterface, LoginValues, RegisterValues } from '../../interfaces/authInterfaces';

const initialState: initialStateAuthSliceInterface = {
	user: null,
	users: [],
	token: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	error: null,
	msg: null,
};

export const login = createAsyncThunk('auth/login', async (user: LoginValues, thunkAPI: any) => {
    try {
        return await authService.login(user);
    } catch (error: any) {
        const errorMessage: string = error.response.data.msg;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const register = createAsyncThunk('auth/register', async (user: RegisterValues, thunkAPI: any) => {
    try {
        return await authService.register(user);
    } catch (error: any) {
        const errorMessage: string = error.response.data.msg;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI: any) => {
	try {
		return await authService.logoutUser();
	} catch (error: any) {
		const errorMessage: string = error.response.data.msg;
		return thunkAPI.rejectWithValue(errorMessage);
	}
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state: any) => {
			state.user = null;
			state.users = [];
			state.token = null;
			state.isLoading = true;
			state.isSuccess = false;
			state.isError = false;
			state.error = null;
			state.msg = null;
		},
	},
	extraReducers: (builder: any) => {
		builder
			.addCase(login.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
			})
			.addCase(login.pending, (state: any) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state: any, action: any) => {
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.msg = action.payload.msg;
				state.loading = false;
			})
			.addCase(logoutUser.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
			})
			.addCase(logoutUser.pending, (state: any) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(logoutUser.fulfilled, (state: any, action: any) => {
				state.user = action.payload.user;
				state.msg = action.payload.msg;
				state.loading = false;
			})
			.addCase(register.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
			})
			.addCase(register.pending, (state: any) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state: any, action: any) => {
				state.user = action.payload.user;
				state.msg = action.payload.msg;
				state.loading = false;
			});
	},
});

export const {reset} = authSlice.actions;

export default authSlice.reducer;
