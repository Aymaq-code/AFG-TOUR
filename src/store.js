import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";
import tourReducer from "./pages/Tours/tourSlice";
import currencyReducer from "./features/currency/currencySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    tour: tourReducer,
    currency: currencyReducer,
  },
});

export default store;
