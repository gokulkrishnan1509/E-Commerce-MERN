import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

export const resetState = createAction("Reset_all");

export const getAllProductsfromServer = createAsyncThunk(
  "product/get-all",
  async (data,thunkAPI) => {
    try {
      const response = await productService.getProducts(data);
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

export const getSingleProductFromServer = createAsyncThunk(
  "product/getOneproduct",
  async (id, thunkAPI) => {
    try {
      const response = await productService.getSingleProduct(id);
      return response.product;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const rateProductByUser = createAsyncThunk(
  "product/ratings",
  async (data, thunkAPI) => {
    try {
      const response = await productService.rateProduct(data);
      if (response) {
        thunkAPI.dispatch(getAllProductsfromServer())
        return response;

      }
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
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getSingleProductFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleProductFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleProduct = action.payload;
      })
      .addCase(getSingleProductFromServer.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(rateProductByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rateProductByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.rating = action.payload;
      })
      .addCase(rateProductByUser.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(resetState, () => productState);
  },
});

export default productSlice.reducer;
