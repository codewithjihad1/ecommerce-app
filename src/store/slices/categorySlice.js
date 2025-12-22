import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryName: "woman",
};

export const categorySlice = createSlice({
    name: "categoryName",
    initialState,
    reducers: {
        setCategoryName: (state, action) => {
            state.categoryName = action.payload;
        },
    },
});

export const { setCategoryName } = categorySlice.actions;
export default categorySlice.reducer;
