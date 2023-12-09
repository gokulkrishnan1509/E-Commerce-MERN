import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../../features/user/userSlice";
import productSlice from "../../features/products/productSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
  },
});
