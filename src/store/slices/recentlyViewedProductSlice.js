import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const recentlyViewed = createSlice({
    name: "recentlyViewed",
    initialState,
    reducers: {
        addRecentlyViewedProduct: (state, action) => {
            const product = action.payload;
            console.log("Reducer payload:", action.payload);
            if (!product?._id) return;
            const now = Date.now();

            // remove expire items
            state.items = state.items.filter(
                (item) => now - item.viewedAt < 30 * 24 * 60 * 60 * 1000,
            );
            // remove duplicate items
            state.items = state.items.filter(
                (item) => item._id !== product._id,
            );

            state.items.unshift({
                ...product,
                viewedAt: now,
            });
            // limit to 50 items
            if (state.items.length > 50) {
                state.items.pop();
            }
        },
        clearRecentlyViewedProducts: (state) => {
            state.items = [];
        },
    },
});
export const { addRecentlyViewedProduct, clearRecentlyViewedProducts } =
    recentlyViewed.actions;
export default recentlyViewed.reducer;
