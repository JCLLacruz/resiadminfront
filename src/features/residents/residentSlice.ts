import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import residentService from './residentService';
import { attendanceValues, initialStateResidentSliceInterface, residentValues } from '../../interfaces/residentInterfaces';
import { getImageSrc } from '../../utils/functions';

const initialState: initialStateResidentSliceInterface = {
	resident: null,
	residents: [],
	images: [],
	image: null,
	imagesIsLoading: false,
	isLoading: false,
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
export const getResidentById = createAsyncThunk('residents/getResidentById', async (id: string, thunkAPI: any) => {
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
export const updateResident = createAsyncThunk('residents/updateResident', async ({ resident, id }: { resident: residentValues; id: string }, thunkAPI: any) => {
	try {
		return await residentService.updateResident(resident, id);
	} catch (error: any) {
		const errorMessage: string = error.response.data.msg;
		return thunkAPI.rejectWithValue(errorMessage);
	}
});
export const updateAttendance = createAsyncThunk('residents/updateAttendance', async (attendance: attendanceValues, thunkAPI: any) => {
	try {
		return await residentService.updateAttendance(attendance);
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
	async ({ imageId, id }: { imageId: string; id: string }, thunkAPI: any) => {
		try {
			return await residentService.deleteImageResident(imageId, id);
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
			state.resident = null;
			state.residents = [];
			state.images = [];
			state.image = null;
			state.imagesIsLoading = false;
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.error = null;
			state.msg = null;
		},
		resetLoading: (state: any) => {
			state.isLoading = true;
		},
		resetResident: (state: any) => {
			state.resident = null
		},
	},
	extraReducers: (builder: any) => {
		builder
			.addCase(getAllResidents.rejected, (state: any, action: any) => {
				state.error = action.payload;
				state.msg = action.payload;
				state.isError = true;
				state.isLoading = false;
				state.imagesIsLoading = false;
				state.isSuccess = false;
			})
			.addCase(getAllResidents.pending, (state: any) => {
				state.isError = false;
				state.isSuccess = false;
				state.isLoading = true;
				state.imagesIsLoading = true;
			})
			.addCase(getAllResidents.fulfilled, (state: any, action: any) => {
				state.residents = action.payload.residents;
				state.msg = action.payload.msg;
				state.isLoading = false;
				state.imagesIsLoading = false;
				state.isSuccess = true;
			})
			.addCase(getResidentById.rejected, (state: any, action: any) => {
				state.error = action.payload;
				state.msg = action.payload;
				state.isError = true;
				state.isLoading = false;
				state.imagesIsLoading = false;
				state.isSuccess = false;
			})
			.addCase(getResidentById.pending, (state: any) => {
				state.isError = false;
				state.isSuccess = false;
				state.imagesIsLoading = true;
				state.isLoading = true;
			})
			.addCase(getResidentById.fulfilled, (state: any, action: any) => {				
				state.resident = action.payload.resident;
				if (action.payload.resident.images.length > 0) {
					const srcImages = action.payload.resident.images.map((image: any) => {						
						return { src: getImageSrc(image.data.data, image.contentType), _id: image._id };
					});
					state.images = srcImages;
					state.image = {src: getImageSrc(action.payload.resident.images[0].data.data, action.payload.resident.images[0].contentType), _id: action.payload.resident.images[0]._id};
				} else {
					state.images = [];
					state.image = null;
				}
				state.msg = action.payload.msg;
				state.isLoading = false;
				state.imagesIsLoading = false;
				state.isSuccess = true;
			})
			.addCase(createResident.rejected, (state: any, action: any) => {
				state.error = action.payload;
				state.msg = action.payload;
				state.isError = true;
				state.isLoading = false;
				state.imagesIsLoading = false;
				state.isSuccess = false;
			})
			.addCase(createResident.pending, (state: any) => {
				state.isError = false;
				state.isSuccess = false;
				state.imagesIsLoading = true;
				state.isLoading = true;
			})
			.addCase(createResident.fulfilled, (state: any, action: any) => {
				state.resident = action.payload.resident;
				state.msg = action.payload.msg;
				state.isLoading = false;
				state.imagesIsLoading = false;
				state.isSuccess = true;
			})
			.addCase(updateResident.rejected, (state: any, action: any) => {
				state.error = action.payload;
				state.msg = action.payload;
				state.isError = true;
				state.isLoading = false;
				state.imagesIsLoading = false;
				state.isSuccess = false;
			})
			.addCase(updateResident.pending, (state: any) => {
				state.isError = false;
				state.isSuccess = false;
				state.imagesIsLoading = true;
				state.isLoading = true;
			})
			.addCase(updateResident.fulfilled, (state: any, action: any) => {
				state.resident = action.payload.resident;
				state.msg = action.payload.msg;
				state.isLoading = false;
				state.imagesIsLoading = false;
				state.isSuccess = true;
			})
			.addCase(updateAttendance.rejected, (state: any, action: any) => {
				state.error = action.payload;
				state.msg = action.payload;
				state.isError = true;
				state.isLoading = false;
				state.imagesIsLoading = false;
				state.isSuccess = false;
			})
			.addCase(updateAttendance.pending, (state: any) => {
				state.isError = false;
				state.isSuccess = false;
				state.imagesIsLoading = true;
				state.isLoading = true;
			})
			.addCase(updateAttendance.fulfilled, (state: any, action: any) => {
				state.msg = action.payload.msg;
				state.isLoading = false;
				state.imagesIsLoading = false;
				state.isSuccess = true;
			})
			.addCase(deleteResident.rejected, (state: any, action: any) => {
				state.error = action.payload;
				state.msg = action.payload;
				state.isError = true;
				state.isLoading = false;
				state.imagesIsLoading = false;
				state.isSuccess = false;
			})
			.addCase(deleteResident.pending, (state: any) => {
				state.isError = false;
				state.isSuccess = false;
				state.imagesIsLoading = true;
				state.isLoading = true;
			})
			.addCase(deleteResident.fulfilled, (state: any, action: any) => {
				state.images = action.payload.images;
				state.image = null;
				state.msg = action.payload.msg;
				state.isLoading = false;
				state.imagesIsLoading = false;
				state.isSuccess = true;
			})
			.addCase(uploadImageResident.rejected, (state: any, action: any) => {
				state.error = action.payload;
				state.msg = action.payload;
				state.isError = true;
				state.isLoading = false;
				state.imagesIsLoading = false;
				state.isSuccess = false;
			})
			.addCase(uploadImageResident.pending, (state: any) => {
				state.isError = false;
				state.isSuccess = false;
				state.isLoading = true;
				state.imagesIsLoading = true;
			})
			.addCase(uploadImageResident.fulfilled, (state: any, action: any) => {
				if(action.payload.image){
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
			.addCase(deleteImageResident.rejected, (state: any, action: any) => {
				state.error = action.payload;
				state.msg = action.payload;
				state.isError = true;
				state.isLoading = false;
				state.imagesIsLoading = false;
				state.isSuccess = false;
			})
			.addCase(deleteImageResident.pending, (state: any) => {
				state.isError = false;
				state.isSuccess = false;
				state.isLoading = true;
				state.imagesIsLoading = true;
			})
			.addCase(deleteImageResident.fulfilled, (state: any, action: any) => {
				state.msg = action.payload.msg;
				state.isLoading = false;
				state.imagesIsLoading = false;
				state.isSuccess = true;
			});
	},
});

export const { reset, resetLoading, resetResident } = residentSlice.actions;

export default residentSlice.reducer;
