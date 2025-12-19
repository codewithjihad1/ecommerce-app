import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find(
                (p) =>
                    p._id === item._id &&
                    p.color === item.color &&
                    p.size === item.size,
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    ...item,
                    quantity: 1,
                });
            }
        },

        removeFromCart: (state, action) => {
            const { _id, color, size } = action.payload;
            state.items = state.items.filter(
                (p) =>
                    !(
                        p._id === _id &&
                        p.color === color &&
                        p.size === size
                    ),
            );
        },

        increasedQty: (state, action) => {
            const { _id, color, size } = action.payload;
            const existingItem = state.items.find(
                (p) =>
                    p._id === _id &&
                    p.color === color &&
                    p.size === size,
            );

            if (existingItem) {
                existingItem.quantity += 1;
            }
        },

        decreasedQty: (state, action) => {
            const { _id, color, size } = action.payload;
            const existingItem = state.items.find(
                (p) =>
                    p._id === _id &&
                    p.color === color &&
                    p.size === size,
            );

            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            }
        },

        clearCart: (state) => {
            state.items = [];
        },
    },
}); 

export const {
    addToCart,
    removeFromCart,
    increasedQty,
    decreasedQty,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
