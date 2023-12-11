import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../../features/user/userSlice";
import productSlice from "../../features/products/productSlice";
import blogSlice from "../../features/blogs/blogSlice";
import contactSlice from "../../features/contact/contactSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    blog: blogSlice,
    contact: contactSlice,
  },
});
