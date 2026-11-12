import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import productionTypesReducer from './slices/productionTypesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    productionTypes: productionTypesReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;