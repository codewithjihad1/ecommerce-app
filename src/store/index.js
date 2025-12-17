import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

const reducers = combineReducers({
    auth: authReducer,
});

export const store = configureStore({
    reducer: reducers,
});
