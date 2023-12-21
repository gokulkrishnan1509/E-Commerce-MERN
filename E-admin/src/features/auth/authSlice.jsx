import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: getUserfromLocalStorage,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/admin-login",
  async (user, thunkApi) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getUserOrderFromServer = createAsyncThunk(
  "order/getone-orders",
  async (id, thunkApi) => {
    try {
      const response = await authService.getUserOrder(id);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getMonthlyOrderFromServer = createAsyncThunk(
  "auth/monthly-data",
  async (thunkApi) => {
    try {
      const response = await authService.getMonthlyOrder();
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getYearlyTotalFromServer = createAsyncThunk(
  "auth/yearly-data",
  async (thunkApi) => {
    try {
      const response = await authService.getYearlyStates();
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getAllUserOrderFromServer = createAsyncThunk(
  "auth/all-user-order",
  async (thunkApi) => {
    try {
      const response = await authService.getAllOrder();
      return response.orders;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateUserOrderOnServer = createAsyncThunk(
  "auth/auth-update",
  async (data, thunkApi) => {
    try {
      const response = await authService.updateUserOrder(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(getUserOrderFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrderFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userOrder = action.payload;
      })
      .addCase(getUserOrderFromServer.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(getMonthlyOrderFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthlyOrderFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.getMonthlyData = action.payload;
      })
      .addCase(getMonthlyOrderFromServer.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(getYearlyTotalFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getYearlyTotalFromServer.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.getYearlyData = action.payload;
      })
      .addCase(getYearlyTotalFromServer.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(getAllUserOrderFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUserOrderFromServer.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(getAllUserOrderFromServer.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(updateUserOrderOnServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserOrderOnServer.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(updateUserOrderOnServer.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      });
  },
});

export default authSlice.reducer;
