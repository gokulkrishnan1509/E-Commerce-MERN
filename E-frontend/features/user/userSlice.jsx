import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./userService";
import { toast } from "react-toastify";

export const resetState = createAction("Reset_all");

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginToserver = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.login(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserWislistFromServer = createAsyncThunk(
  "auth/wishlist",
  async (thunkAPI) => {
    try {
      const response = await authService.getUserWislist();
      return response.getBlog;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getCustomerfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const initialState = {
  user: getCustomerfromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
        // if (state.isSuccess === true) {
        //   toast.info("User Crated successfully");
        // }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        // if (state.isError === true) {
        //   toast.error(action.error);
        // }
      })
      .addCase(loginToserver.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginToserver.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userLogged = action.payload;
        // localStorage.setItem("user", JSON.stringify(response.data));

        if (state.isSuccess) {
          localStorage.setItem("token", JSON.stringify(action.payload.token));
        }
      })
      .addCase(loginToserver.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUserWislistFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserWislistFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userWishListData = action.payload;
      })
      .addCase(getUserWislistFromServer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
