import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//const BASE_URL = 'http://localhost:4000/api/';

// Get user from localStorage
//const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
	user: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Register user
export const registerApi = createAsyncThunk('auth/registerApi', async (user, thunkAPI) => {
	try {
		const response = await axios.post('/auth/signup', user);
		return response.data;
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Login user
export const loginApi = createAsyncThunk('auth/loginApi', async (user, thunkAPI) => {
	try {
		const response = await axios.post('/auth/signin', user);
		return response.data;
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const logoutApi = createAsyncThunk('auth/logoutApi', async (thunkAPI) => {
	try {
		const response = await axios.post('/auth/logout');
		return response.data;
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerApi.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerApi.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(registerApi.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(loginApi.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginApi.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(loginApi.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(logoutApi.fulfilled, (state) => {
				state.user = null;
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
