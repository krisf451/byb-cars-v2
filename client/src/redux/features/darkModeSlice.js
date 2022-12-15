/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const darkModeSlice = createSlice({
  name: 'darkModeSlice',
  initialState: {
    isDarkMode: false,
  },
  reducers: {
    selectIsDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { selectIsDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
