import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogCateSerivce from "./BlogcateService";

export const getBlogCate = createAsyncThunk(
  "blogcate/getblog-cate",
  async (thunkAPI) => {
    try {
      const response = await blogCateSerivce.getBlogCate();
      return response.getAll;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  blogcategory: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const blogCategorySlice = createSlice({
  name: "blogcategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogCate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogcategory = action.payload;
      })
      .addCase(getBlogCate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default blogCategorySlice.reducer;
