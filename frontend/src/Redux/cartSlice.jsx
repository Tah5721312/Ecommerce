import { createSlice } from "@reduxjs/toolkit";

// تحميل البيانات من localStorage عند بداية التطبيق
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exist = state.cartItems.find((x) => x.id === item.id);

      if (exist) {
        exist.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }

      // حفظ البيانات بعد التعديل
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((x) => x.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((x) => x.id === action.payload.id);
      if (item) {
        item.quantity -= 1;

        if (item.quantity === 0) {
          state.cartItems = state.cartItems.filter((x) => x.id !== item.id);
        }

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
