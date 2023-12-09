import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

export const resetState = createAction("Reset_all");

export const getAllProductsfromServer = createAsyncThunk(
  "product/get-all",
  async (thunkAPI) => {
    try {
      const response = await productService.getProducts();
      return response.getallProudcts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addProductToWishlist = createAsyncThunk(
  "product/add-wishproduct",
  async (id, thunkAPI) => {
    try {
      const response = await productService.addToWishlist(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const productState = {
  product: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState: productState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsfromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProductsfromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.Products = action.payload;
        // console.log(state.Products,'*******************')
      })
      .addCase(getAllProductsfromServer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isError = action.error;
      })
      .addCase(addProductToWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishProduct = action.payload;
        state.message = "Product Added To Wishlist !";
      })
      .addCase(addProductToWishlist.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = true;
        state.isSuccess = true;
        state.message = action.error;
      })
      .addCase(resetState, () => productState);
  },
});

export default productSlice.reducer;
