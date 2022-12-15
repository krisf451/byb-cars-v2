/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  currentUser: user || null,
  isSuccess: false,
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export const asyncSignup = createAsyncThunk(
  'auth/asyncRegister',
  async (formValues, thunkAPI) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/signup`, formValues);
      return data;
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message)
        || e.message
        || e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const asyncSignin = createAsyncThunk(
  'auth/asyncLogin',
  async (formValues, thunkAPI) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/signin`, formValues);
      return data;
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message)
        || e.message
        || e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = '';
    },
    logout: (state) => {
      if (state.currentUser !== null) {
        toast.success('Logged out successfully');
      }
      state.currentUser = null;
      localStorage.removeItem('user');
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
  extraReducers: {
    [asyncSignin.pending]: (state) => {
      state.isLoading = true;
    },
    [asyncSignin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      localStorage.setItem('user', JSON.stringify(action.payload.data));
      state.currentUser = action.payload.data;
      toast.success('Signin Success!!');
    },
    [asyncSignin.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
      state.currentUser = null;
    },
    [asyncSignup.pending]: (state) => {
      state.isLoading = true;
    },
    [asyncSignup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      localStorage.setItem('user', JSON.stringify(action.payload.data));
      state.currentUser = action.payload.data;
      toast.success('Signup Success!!');
    },
    [asyncSignup.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
      state.currentUser = null;
    },
  },
});

export const { reset, logout, setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
