// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [
//     { id: "adult", unitPrice: 0, quantity: 1, type: "person" },
//     { id: "child", unitPrice: 0, quantity: 0, type: "person" },
//   ],
//   selectedHotel: null,
//   selectedExtras: [],
//   selectedDate: null,
//   totalPrice: 0,
//   discount: 0,
//   couponCode: "",
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,

//   reducers: {
//     updateQuantity(state, action) {
//       const { id, quantity } = action.payload;
//       const item = state.items.find((i) => i.id === id);
//       if (!item) return;
//       if (id === "adult" && quantity < 1) return;

//       item.quantity = quantity;
//       cartSlice.caseReducers.recalculateTotal(state);
//     },

//     initializePrices(state, action) {
//       const { adultPrice, childPrice } = action.payload;
//       state.items.forEach((item) => {
//         if (item.id === "adult") {
//           item.unitPrice = adultPrice;
//           item.quantity = 1;
//         } else if (item.id === "child") {
//           item.unitPrice = childPrice;
//         }
//       });
//       cartSlice.caseReducers.recalculateTotal(state);
//     },

//     recalculateTotal(state) {
//       const personsTotal = state.items.reduce(
//         (sum, item) => sum + item.unitPrice * item.quantity,
//         0
//       );

//       const hotelTotal = state.selectedHotel ? state.selectedHotel.price : 0;

//       const extrasTotal = state.selectedExtras.reduce(
//         (sum, extra) => sum + extra.price,
//         0
//       );

//       const subtotal = personsTotal + hotelTotal + extrasTotal;

//       state.totalPrice = subtotal - state.discount;
//     },

//     selectHotel(state, action) {
//       state.selectedHotel = action.payload;
//       cartSlice.caseReducers.recalculateTotal(state);
//     },

//     toggleExtraService(state, action) {
//       const service = action.payload;
//       const exists = state.selectedExtras.find((s) => s.id === service.id);

//       state.selectedExtras = exists
//         ? state.selectedExtras.filter((s) => s.id !== service.id)
//         : [...state.selectedExtras, service];

//       cartSlice.caseReducers.recalculateTotal(state);
//     },

//     setTourDate(state, action) {
//       state.selectedDate = action.payload;
//     },

//     // ⭐ Correct coupon reducer
//     applyCoupon(state, action) {
//       const { code, discount } = action.payload;
//       state.couponCode = code;
//       state.discount = discount;
//       cartSlice.caseReducers.recalculateTotal(state);
//     },

//     clearCart(state) {
//       Object.assign(state, initialState);
//     },
//   },
// });

// export const {
//   updateQuantity,
//   initializePrices,
//   recalculateTotal, // ⭐ Add this export
//   selectHotel,
//   toggleExtraService,
//   setTourDate,
//   applyCoupon,
//   clearCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;
