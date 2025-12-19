import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";

const reducers = combineReducers({
    auth: authReducer,
    cart: cartReducer,
});

export const store = configureStore({
    reducer: reducers,
});
