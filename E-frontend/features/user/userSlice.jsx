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

export const addProductToCartServer = createAsyncThunk(
  "auth/addcart",
  async (product, thunkAPI) => {
    try {
      const response = await authService.addToCart(product);

      if (response) {
        return response;
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserCartFromServer = createAsyncThunk(
  "auth/getCart",
  async (thunkAPI) => {
    try {
      const response = await authService.getUserCart();
      if (response) {
        return response.cart;
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deletUserCartFromServer = createAsyncThunk(
  "auth/deleteusercart",
  async (id, thunkAPI) => {
    try {
      const response = await authService.removeProductCart(id);
      if (response) {
        thunkAPI.dispatch(getUserCartFromServer());
        return response;
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUserCartQuantity = createAsyncThunk(
  "auth/updateusercart",
  async (data, thunkAPI) => {
    try {
      const response = await authService.updateProductquanToCart(data);
      return response;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserOrdersFromServer = createAsyncThunk(
  "user/user-order",
  async (thunkAPI) => {
    try {
      return await authService.getUserOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUserDetailsatServer = createAsyncThunk(
  "user/user-crediantials",
  async (data, thunkAPI) => {
    try {
      const response = await authService.updateUserDetailsByToken(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getForgotPasswordToken = createAsyncThunk(
  "user/user-forgotpassword",
  async (data, thunkAPI) => {
    try {
      const response = await authService.forgotPasswordToken(data);
      return response;
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
      .addCase(addProductToCartServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductToCartServer.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.cartProduct = action.payload;
      })
      .addCase(addProductToCartServer.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getUserCartFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCartFromServer.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.getUserCartProduct = action.payload;
      })
      .addCase(getUserCartFromServer.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deletUserCartFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletUserCartFromServer.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.deleted = action.payload;
      })
      .addCase(deletUserCartFromServer.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateUserCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserCartQuantity.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.updatedQuantity = action.payload;
      })
      .addCase(updateUserCartQuantity.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(getUserOrdersFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrdersFromServer.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.userOrders = action.payload?.orders;
      })
      .addCase(getUserOrdersFromServer.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(updateUserDetailsatServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserDetailsatServer.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.updatedUserDetails = action?.payload;

        let currentUserData = JSON.parse(localStorage.getItem("customer"));
        let newUserData = {
          _id: currentUserData?._id,
          token: currentUserData?.token,
          name: action?.payload?.user?.name,
          email: action?.payload?.user?.email,
          mobile: action?.payload?.user?.mobile,
        };

        localStorage.setItem("customer", JSON.stringify(newUserData));
        // state.user=newUserData
      })
      .addCase(updateUserDetailsatServer.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(getForgotPasswordToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getForgotPasswordToken.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(getForgotPasswordToken.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
