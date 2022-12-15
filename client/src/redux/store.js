import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import darkModeSliceReducer from './features/darkModeSlice';
import authSliceReducer from './features/authSlice';
import { carsApi } from './services/CARS';

export const store = configureStore({
  reducer: {
    darkModeSlice: darkModeSliceReducer,
    auth: authSliceReducer,
    [carsApi.reducerPath]: carsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(carsApi.middleware),
});
setupListeners(store.dispatch);
