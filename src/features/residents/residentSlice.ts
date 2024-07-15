import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import residentService from './residentService';
import { initialStateResidentSliceInterface } from '../../interfaces/residentInterfaces';

const getImageSrc = (data: ArrayBuffer, contentType: string) => {
	const base64String = btoa(new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
	return `data:${contentType};base64,${base64String}`;
};

const initialState: initialStateResidentSliceInterface = {
	resident: null,
	residents: [],
	images: [],
	image: null,
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
export const createResident = createAsyncThunk('residents/createResident', async (resident: any, thunkAPI: any) => {
	try {
		return await residentService.createResident(resident);
	} catch (error: any) {
		const errorMessage: string = error.response.data.msg;
		return thunkAPI.rejectWithValue(errorMessage);
	}
});
export const updateResident = createAsyncThunk('residents/updateResident', async ({ resident, id }: { resident: any; id: string }, thunkAPI: any) => {
	try {
		return await residentService.updateResident(resident, id);
	} catch (error: any) {
		const errorMessage: string = error.response.data.msg;
		return thunkAPI.rejectWithValue(errorMessage);
	}
});
export const deleteResident = createAsyncThunk('residents/deleteResident', async (id: string, thunkAPI: any) => {
	try {
		return await residentService.deleteResident(id);
	} catch (error: any) {
		const errorMessage: string = error.response.data.msg;
		return thunkAPI.rejectWithValue(errorMessage);
	}
});
export const uploadImageResident = createAsyncThunk('residents/uploadImageResident', async (image: any, thunkAPI: any) => {
	try {
		return await residentService.uploadImageResident(image);
	} catch (error: any) {
		const errorMessage: string = error.response.data.msg;
		return thunkAPI.rejectWithValue(errorMessage);
	}
});
export const deleteImageResident = createAsyncThunk(
	'residents/deleteImageResident',
	async ({ imageId, residentId }: { imageId: string; residentId: string }, thunkAPI: any) => {
		try {
			return await residentService.deleteImageResident(imageId, residentId);
		} catch (error: any) {
			const errorMessage: string = error.response.data.msg;
			return thunkAPI.rejectWithValue(errorMessage);
		}
	}
);

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
				if (action.payload.resident.images.length != 0) {
					const srcImages = action.payload.resident.images.map((image: any) => {
						return { src: getImageSrc(image.data.data, image.contentType), _id: image._id };
					});
					state.images = srcImages;
				} else {
					state.images = [];
				}
				state.msg = action.payload.msg;
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(createResident.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
				state.isSuccess = false;
			})
			.addCase(createResident.pending, (state: any) => {
				state.isError = false;
				state.isSuccess = false;
				state.isLoading = true;
			})
			.addCase(createResident.fulfilled, (state: any, action: any) => {
				state.resident = action.payload.resident;
				state.msg = action.payload.msg;
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(updateResident.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
				state.isSuccess = false;
			})
			.addCase(updateResident.pending, (state: any) => {
				state.isError = false;
				state.isSuccess = false;
				state.isLoading = true;
			})
			.addCase(updateResident.fulfilled, (state: any, action: any) => {
				state.resident = action.payload.resident;
				state.msg = action.payload.msg;
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(deleteResident.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
				state.isSuccess = false;
			})
			.addCase(deleteResident.pending, (state: any) => {
				state.isError = false;
				state.isSuccess = false;
				state.isLoading = true;
			})
			.addCase(deleteResident.fulfilled, (state: any, action: any) => {
				state.resident = action.payload.resident;
				state.msg = action.payload.msg;
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(uploadImageResident.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
				state.isSuccess = false;
			})
			.addCase(uploadImageResident.pending, (state: any) => {
				state.isError = false;
				state.isSuccess = false;
				state.isLoading = true;
			})
			.addCase(uploadImageResident.fulfilled, (state: any, action: any) => {
				state.image = {src: getImageSrc(action.payload.image.data.data, action.payload.image.contentType), _id: action.payload.image._id};
				console.log('action.payload.images', action.payload.images);
				if (action.payload.images >= 1) {
					const srcImages = action.payload.images.map((image: any) => {
						console.log('image', image);

						return { src: getImageSrc(image.data.data, image.contentType), _id: image._id };
					});
					state.images = srcImages;
				} else {
					state.images = [];
				}
				state.msg = action.payload.msg;
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(deleteImageResident.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
				state.isSuccess = false;
			})
			.addCase(deleteImageResident.pending, (state: any) => {
				state.isError = false;
				state.isSuccess = false;
				state.isLoading = true;
			})
			.addCase(deleteImageResident.fulfilled, (state: any, action: any) => {
				state.msg = action.payload.msg;
				state.isLoading = false;
				state.isSuccess = true;
			});
	},
});

export const { reset, resetLoading } = residentSlice.actions;

export default residentSlice.reducer;
