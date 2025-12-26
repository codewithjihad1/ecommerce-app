import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addItem(state, action) {
            const item = action.payload;
            if (!item) return;

            if (
                !state.items.find(
                    (i) =>
                        i._id === item._id &&
                        i.color === item.color &&
                        i.size === item.size,
                )
            ) {
                state.items.push(item);
            }
        },
        removeItem(state, action) {
            const itemId = action.payload;
            state.items = state.items.filter((item) => item._id !== itemId);
        },
        clearWishlist(state) {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
