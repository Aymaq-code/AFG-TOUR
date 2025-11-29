// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  person: 1,
  items: [
    { id: "adult", unitPrice: 0, quantity: 0 },
    { id: "child", unitPrice: 0, quantity: 0 },
  ],
  totalPrice: 0,
  discount: 0,
  couponCode: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPerson(state) {
      state.person += 1;
    },
    removePerson(state) {
      if (state.person > 1) state.person -= 1;
    },
    setPerson(state, action) {
      const n = Number(action.payload);
      if (!Number.isNaN(n) && n >= 1) state.person = n;
    },
    addToCart(state, action) {
      const { tour, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.id === tour.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...tour, quantity });
      }
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.unitPrice * item.quantity,
        0
      );
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.unitPrice * item.quantity,
        0
      );
    },
    updateQuantity(state, action) {
      const { id, quantity, unitPrice } = action.payload;
      const item = state.items.find((i) => i.id === id);

      if (!item) return;

      // prevent negative numbers
      if (quantity < 0) return;

      item.quantity = quantity;

      // Update unitPrice if provided (for initial setup)
      if (unitPrice !== undefined) {
        item.unitPrice = unitPrice;
      }

      state.totalPrice = state.items.reduce(
        (t, i) => t + i.unitPrice * i.quantity,
        0
      );
    },

    // New action to initialize prices
    initializePrices(state, action) {
      const { adultPrice, childPrice } = action.payload;
      const adultItem = state.items.find((item) => item.id === "adult");
      const childItem = state.items.find((item) => item.id === "child");

      if (adultItem && adultItem.unitPrice === 0) {
        adultItem.unitPrice = adultPrice;
        adultItem.quantity = 1; // Default to 1 adult
      }

      if (childItem && childItem.unitPrice === 0) {
        childItem.unitPrice = childPrice;
      }

      // Recalculate total
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.unitPrice * item.quantity,
        0
      );
    },

    applyCoupon(state, action) {
      const { code, discount } = action.payload;
      state.couponCode = code;
      state.discount = discount;
    },
    clearCart(state) {
      state.items = [
        { id: "adult", unitPrice: 0, quantity: 0 },
        { id: "child", unitPrice: 0, quantity: 0 },
      ];
      state.person = 1;
      state.totalPrice = 0;
      state.discount = 0;
      state.couponCode = "";
    },
  },
});

export const {
  addPerson,
  removePerson,
  setPerson,
  addToCart,
  removeFromCart,
  updateQuantity,
  initializePrices,
  applyCoupon,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
