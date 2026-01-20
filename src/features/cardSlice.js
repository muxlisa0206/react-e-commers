import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const cardSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      saveCartToLocalStorage(state.cart);
    },
    removeToCart: (state, action) => {
      state.cart = state.cart.filter((el) => el.id !== action.payload.id);
      saveCartToLocalStorage(state.cart);
    },
    increase: (state, action) => {
      state.cart = state.cart.map((el) => {
        if (el.id === action.payload) {
          return { ...el, qty: (el.qty || 0) + 1 };
        }
        return el;
      });
      saveCartToLocalStorage(state.cart);
    },
    decrease: (state, action) => {
      let item = state.cart.find((el) => el.id === action.payload);
      if (item && item.qty > 1) {
        state.cart = state.cart.map((el) => {
          if (el.id === action.payload) {
            return { ...el, qty: (el.qty || 0) - 1 };
          }
          return el;
        });
      } else {
        state.cart = state.cart.filter((el) => el.id !== action.payload);
      }
      saveCartToLocalStorage(state.cart);
    },
    removeProduct: (state, action) => {
      state.cart = state.cart.filter((el) => el.id !== action.payload);
      saveCartToLocalStorage(state.cart);
    },
  },
});

export const { addToCart, removeToCart, increase, decrease, removeProduct } = cardSlice.actions;
export default cardSlice.reducer;
