import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';
import { initialStateAuthSliceInterface, LoginValues, RegisterValues, resetPasswordValues, UserInterface } from '../../interfaces/authInterfaces';
import { getImageSrc } from '../../utils/functions';

const currentUser: UserInterface = JSON.parse(localStorage.getItem('user') || '{}');
const token: string = localStorage.getItem('token') || '';

const initialState: initialStateAuthSliceInterface = {
	currentUser,
	user: null,
	users: [],
	images: [],
	image: null,
	imagesIsLoading: false,
	token,
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
export const updateUser = createAsyncThunk('auth/updateUser', async ({ user, id }: { user: RegisterValues; id: string }, thunkAPI: any) => {
	try {
		return await authService.updateUser(user, id);
	} catch (error: any) {
		const errorMessage: string = error.response.data.msg;
		return thunkAPI.rejectWithValue(errorMessage);
	}
});
export const getUserById = createAsyncThunk('auth/getUserById', async (id: string, thunkAPI: any) => {
	try {
		return await authService.getUserById(id);
	} catch (error: any) {
		const errorMessage: string = error.response.data.msg;
		return thunkAPI.rejectWithValue(errorMessage);
	}
});
export const getAllUsers = createAsyncThunk('auth/getAllUsers', async (_, thunkAPI: any) => {
	try {
		return await authService.getAllUsers();
	} catch (error: any) {
		const errorMessage: string = error.response.data.msg;
		return thunkAPI.rejectWithValue(errorMessage);
	}
});
export const deleteUser = createAsyncThunk('auth/deleteUser', async (id: string, thunkAPI: any) => {
	try {
		return await authService.deleteUser(id);
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
export const recoverPassword = createAsyncThunk('auth/recoverPassword', async (email: string, thunkAPI: any) => {
	try {
		return await authService.recoverPassword(email);
	} catch (error: any) {
		const errorMessage: string = error.response.data.msg;
		return thunkAPI.rejectWithValue(errorMessage);
	}
});
export const resetPassword = createAsyncThunk(
	'auth/resetPassword',
	async ({ password, recoverToken }: { password: resetPasswordValues; recoverToken: string }, thunkAPI: any) => {
		try {
			return await authService.resetPassword(password, recoverToken);
		} catch (error: any) {
			const errorMessage: string = error.response.data.msg;
			return thunkAPI.rejectWithValue(errorMessage);
		}
	}
);
export const uploadImageUser = createAsyncThunk('residents/uploadImageUser', async (image: any, thunkAPI: any) => {
	try {
		return await authService.uploadImageUser(image);
	} catch (error: any) {
		const errorMessage: string = error.response.data.msg;
		return thunkAPI.rejectWithValue(errorMessage);
	}
});
export const deleteImageUser = createAsyncThunk(
	'residents/deleteImageUser',
	async ({ imageId, id }: { imageId: string; id: string }, thunkAPI: any) => {
		try {
			return await authService.deleteImageUser(imageId, id);
		} catch (error: any) {
			const errorMessage: string = error.response.data.msg;
			return thunkAPI.rejectWithValue(errorMessage);
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state: any) => {
			state.user = null;
			state.users = [];
			state.image = null;
			state.images = [];
			state.token = null;
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.error = null;
			state.msg = null;
		},
		resetError: (state: any) => {
			state.isError = false;
			state.error = null;
		},
		resetSuccess: (state: any) => {
			state.isSuccess = false;
		},
	},
	extraReducers: (builder: any) => {
		builder
			.addCase(login.pending, (state: any) => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
				state.msg = null;
				state.error = null;
			})
			.addCase(login.fulfilled, (state: any, action: any) => {
				state.currentUser = action.payload.user;
				state.isSuccess = true;
				state.token = action.payload.token;
				state.msg = action.payload.msg;
				state.isLoading = false;
				console.log('action.payload', action.payload.user.images);

				if (action.payload.user.images.length > 0) {
					const srcImages = action.payload.user.images.map((image: any) => {
						return { src: getImageSrc(image.data.data, image.contentType), _id: image._id };
					});
					state.images = srcImages;
					state.image = {
						src: getImageSrc(action.payload.user.images[0].data.data, action.payload.user.images[0].contentType),
						_id: action.payload.user.images[0]._id,
					};
				} else {
					state.images = [];
					state.image = null;
				}
			})
			.addCase(login.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
				state.isSuccess = false;
			})
			.addCase(getUserById.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
			})
			.addCase(getUserById.pending, (state: any) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(getUserById.fulfilled, (state: any, action: any) => {
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.msg = action.payload.msg;
				state.isLoading = false;
				if (action.payload.user.images.length > 0) {
					const srcImages = action.payload.user.images.map((image: any) => {
						return { src: getImageSrc(image.data.data, image.contentType), _id: image._id };
					});
					state.images = srcImages;
					state.image = {
						src: getImageSrc(action.payload.user.images[0].data.data, action.payload.user.images[0].contentType),
						_id: action.payload.user.images[0]._id,
					};
				} else {
					state.images = [];
					state.image = null;
				}
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
				state.user = [];
				state.msg = action.payload.msg;
				state.loading = false;
			})
			.addCase(recoverPassword.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
			})
			.addCase(recoverPassword.pending, (state: any) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(recoverPassword.fulfilled, (state: any, action: any) => {
				state.msg = action.payload.msg;
				state.loading = false;
			})
			.addCase(resetPassword.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
			})
			.addCase(resetPassword.pending, (state: any) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(resetPassword.fulfilled, (state: any, action: any) => {
				state.msg = action.payload.msg;
				state.loading = false;
			})
			.addCase(getAllUsers.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
			})
			.addCase(getAllUsers.pending, (state: any) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(getAllUsers.fulfilled, (state: any, action: any) => {
				state.users = action.payload.users;
				state.msg = action.payload.msg;
				state.loading = false;
			})
			.addCase(deleteUser.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
			})
			.addCase(deleteUser.pending, (state: any) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(deleteUser.fulfilled, (state: any, action: any) => {
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
				state.isLoading = false;
			})
			.addCase(updateUser.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
			})
			.addCase(updateUser.pending, (state: any) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(updateUser.fulfilled, (state: any, action: any) => {
				state.user = action.payload.user;
				state.msg = action.payload.msg;
				state.isLoading = false;
			})
			.addCase(uploadImageUser.rejected, (state: any, action: any) => {
				state.error = action.payload;
				state.msg = action.payload;
				state.isError = true;
				state.isLoading = false;
				state.imagesIsLoading = false;
				state.isSuccess = false;
			})
			.addCase(uploadImageUser.pending, (state: any) => {
				state.isError = false;
				state.isSuccess = false;
				state.isLoading = true;
				state.imagesIsLoading = true;
			})
			.addCase(uploadImageUser.fulfilled, (state: any, action: any) => {
				if (action.payload.image) {
					const image = {
						src: getImageSrc(action.payload.image.data.data, action.payload.image.contentType),
						_id: action.payload.image._id,
					};
					state.image = image;
					state.images.push(image);
				}
				state.msg = action.payload.msg;
				state.isLoading = false;
				state.imagesIsLoading = false;
				state.isSuccess = true;
			})
			.addCase(deleteImageUser.rejected, (state: any, action: any) => {
				state.error = action.payload;
				state.msg = action.payload;
				state.isError = true;
				state.isLoading = false;
				state.imagesIsLoading = false;
				state.isSuccess = false;
			})
			.addCase(deleteImageUser.pending, (state: any) => {
				state.isError = false;
				state.isSuccess = false;
				state.isLoading = true;
				state.imagesIsLoading = true;
			})
			.addCase(deleteImageUser.fulfilled, (state: any, action: any) => {
				state.images = action.payload.images;
				state.image = null;
				state.msg = action.payload.msg;
				state.isLoading = false;
				state.imagesIsLoading = false;
				state.isSuccess = true;
			});
	},
});

export const { reset, resetError, resetSuccess } = authSlice.actions;

export default authSlice.reducer;
