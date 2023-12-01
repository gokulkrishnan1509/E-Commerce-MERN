import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./pcategoryService";

export const getCategory = createAsyncThunk(
  "category/getfromserver",
  async (thunAPI) => {
    try {
      const response = await categoryService.getProductCategory();
      return response.getAll;
    } catch (error) {
      return thunAPI.rejectWithValue(error);
    }
  }
);

export const createCategoryonServer = createAsyncThunk(
  "create/createFrom",
  async (pcategory, thunkAPI) => {
    try {
      const response = await categoryService.createProductCategory(pcategory);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  pCategory: [],
  isError: false,
  createdCategories: "",
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const categorySlice = createSlice({
  name: "pCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.pCategory = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCategoryonServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategoryonServer.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.createdCategories = action.payload;
      })
      .addCase(createCategoryonServer.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default categorySlice.reducer;
