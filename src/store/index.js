import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";

import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import categoryNameReducer from "./slices/categorySlice";
import recentlyViewProductReducer from "./slices/recentlyViewedProductSlice";
import wishlistReducer from "./slices/wishlistSlice";

// persist storage
const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["auth", "cart", "wishlist", "recentlyViewed"],
};

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    categoryName: categoryNameReducer,
    wishlist: wishlistReducer,
    recentlyViewed: recentlyViewProductReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);
