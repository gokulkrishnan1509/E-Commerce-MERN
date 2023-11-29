import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productSlice from "../features/product/productSlice";
import brandSlice from "../features/brand/brandSlice";
import pCategorySlice from "../features/pcategory/pcategorySlice";
import blogSlice from "../features/blogs/blogSlice";
import blogcateSlice from "../features/blogcate/blogcateSlice";
import colorSlice from "../features/color/colorSlice";
import enquirySlice from "../features/enquiry/enquirySlice";
import uploadSlice from "../features/upload/uploadSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productSlice,
    brand: brandSlice,
    pcategory: pCategorySlice,
    blogs: blogSlice,
    blogscategory: blogcateSlice,
    color: colorSlice,
    enquery: enquirySlice,
    upload: uploadSlice,
  },
});
