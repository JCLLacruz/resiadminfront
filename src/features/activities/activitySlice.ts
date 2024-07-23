import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import activityService from './activityService';
import { ActivityValues, initialStateActivitySliceInterface } from '../../interfaces/activityIntefaces';

const initialState: initialStateActivitySliceInterface = {
	activity: null,
	activities: [],
	isLoading: true,
	isSuccess: false,
	isError: false,
	error: null,
	msg: null,
};

export const getAllActivities = createAsyncThunk('activities/getAllActivities', async (_, thunkAPI) => {
    try {
        return await activityService.getAllActivities();
    } catch (error: any) {
        const errorMessage: string = error.response.data.msg;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});
export const getActivityById = createAsyncThunk('activities/getActivityById', async (id: string, thunkAPI) => {
    try {
        return await activityService.getActivityById(id);
    } catch (error: any) {
        const errorMessage: string = error.response.data.msg;
        return thunkAPI.rejectWithValue(errorMessage);
    }
});
export const createActivity = createAsyncThunk('activities/createActivity', async (activity: ActivityValues, thunkAPI) => {
	try {
		return await activityService.createActivity(activity);
	} catch (error: any) {
		const errorMessage: string = error.response.data.msg;
		return thunkAPI.rejectWithValue(errorMessage);
	}
});
export const deleteActivity = createAsyncThunk('activities/deleteActivity', async (id: string, thunkAPI) => {
	try {
		return await activityService.deleteActivity(id);
	} catch (error: any) {
		const errorMessage: string = error.response.data.msg;
		return thunkAPI.rejectWithValue(errorMessage);
	}
});
export const updateActivity = createAsyncThunk('activities/updateActivity', async ({activity, id} : {activity: ActivityValues; id: string}, thunkAPI) => {
	try {
		return await activityService.updateActivity(activity, id)
	} catch (error: any) {
		const errorMessage: string = error.response.data.msg;
		return thunkAPI.rejectWithValue(errorMessage);

	}
})

const activitySlice = createSlice({
	name: 'activity',
	initialState,
	reducers: {
		reset: (state: any) => {
			state.activity = null;
			state.activities = [];
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.error = null;
			state.msg = null;
		},
	},
	extraReducers: (builder: any) => {
		builder
			.addCase(getAllActivities.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
			})
			.addCase(getAllActivities.pending, (state: any) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(getAllActivities.fulfilled, (state: any, action: any) => {
				state.activities = action.payload.activities;
				state.msg = action.payload.msg;
				state.isLoading = false;
			})
			.addCase(getActivityById.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
			})
			.addCase(getActivityById.pending, (state: any) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(getActivityById.fulfilled, (state: any, action: any) => {
				state.activity = action.payload.activity;
				state.msg = action.payload.msg;
				state.isLoading = false;
			})
			.addCase(createActivity.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
			})
			.addCase(createActivity.pending, (state: any) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(createActivity.fulfilled, (state: any, action: any) => {
				state.activity = action.payload.activity;
				state.msg = action.payload.msg;
				state.isLoading = false;
			})
			.addCase(deleteActivity.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
			})
			.addCase(deleteActivity.pending, (state: any) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(deleteActivity.fulfilled, (state: any, action: any) => {
				state.activity = action.payload.activity;
				state.msg = action.payload.msg;
				state.isLoading = false;
			})
			.addCase(updateActivity.rejected, (state: any, action: any) => {
				state.error = action.payload.error;
				state.msg = action.payload.msg;
				state.isError = true;
				state.isLoading = false;
			})
			.addCase(updateActivity.pending, (state: any) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(updateActivity.fulfilled, (state: any, action: any) => {
				state.activity = action.payload.activity;
				state.msg = action.payload.msg;
				state.isLoading = false;
			})
	},
});

export const {reset} = activitySlice.actions;

export default activitySlice.reducer;
