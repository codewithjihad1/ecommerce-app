const { configureStore } = require('@reduxjs/toolkit');
const { combineReducers } = require('@reduxjs/toolkit');

const reducers = combineReducers({});

export const store = configureStore({
    reducer: reducers,
});
