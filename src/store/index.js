import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import categoryNameReducer from "./slices/categorySlice";

const reducers = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    categoryName: categoryNameReducer,
});

export const store = configureStore({
    reducer: reducers,
});
