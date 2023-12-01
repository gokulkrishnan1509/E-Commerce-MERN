import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import couponService from "./couponService";

// const getUserfromLocalStorage = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;

const initialState = {
  coupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getCouponFromServer = createAsyncThunk(
  "coupon/get-coupon",
  async (thunkApi) => {
    try {
      const response = await couponService.getCoupon();
      return response.allCoupons;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const postCouponFromServer = createAsyncThunk(
  "coupon/post-coupon",
  async (coupon, thunkApi) => {
    try {
      const response = await couponService.postCoupon(coupon);
      return response["newCoupon"];
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCouponFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCouponFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupons = action.payload;
      })
      .addCase(getCouponFromServer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.message = action.message;
      })
      .addCase(postCouponFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postCouponFromServer.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.createdCoupons = action.payload;
      })
      .addCase(postCouponFromServer.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default couponSlice.reducer;
