import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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
export const getOneCouponfromServer = createAsyncThunk(
  "coupon/get-One",
  async (id, thunkApi) => {
    try {
      const response = await couponService.getOneCoupon(id);
      return response.oneCoupon;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateOneCouponToserver = createAsyncThunk(
  "coupon/update",
  async (data, thunkApi) => {
    try {
      const response = await couponService.updateOneCoupon(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteOneCouponToserver = createAsyncThunk(
  "coupon/delete",
  async (id, thunkApi) => {
    try {
      const response = await couponService.deleteOneCoupon(id);
      thunkApi.dispatch(getCouponFromServer())

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");
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
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
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
      })
      .addCase(getOneCouponfromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneCouponfromServer.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.dataCoupon = action.payload;
      })
      .addCase(getOneCouponfromServer.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteOneCouponToserver.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOneCouponToserver.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedCoupon = action.payload;
      })
      .addCase(deleteOneCouponToserver.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateOneCouponToserver.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOneCouponToserver.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.updateCoupon = action.payload;
      })
      .addCase(updateOneCouponToserver.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default couponSlice.reducer;
