import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";

export const getProducts = createAsyncThunk(
  "product/get-product",
  async (thunkAPI) => {
    try {
      const response = await productService.getProductsfromServer();

      return response.getallProudcts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProudcts = createAsyncThunk(
  "product/create-products",
  async (productdata, thunkAPI) => {
    try {
      return await productService.createProduct(productdata);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  products: [],
  createProudcts: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProudcts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProudcts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createProudcts = action.payload;
      })
      .addCase(createProudcts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default productSlice.reducer;
