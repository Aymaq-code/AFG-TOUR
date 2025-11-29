import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";
import tourReducer from "./ui/tourSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    tour: tourReducer,
  },
});

export default store;
