import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import categoryNameReducer from "./slices/categorySlice";

// persist storage
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "cart"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  categoryName: categoryNameReducer,
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
