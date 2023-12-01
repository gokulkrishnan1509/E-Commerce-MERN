import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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

export const createBlogCate = createAsyncThunk(
  "blog/create-blog",
  async (blog, thunkAPI) => {
    try {
      const response = await blogCateSerivce.createBlog(blog);
      return response.newCategory;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  blogcategory: [],
  // createdBlogCategory:"",
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
      })
      .addCase(createBlogCate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogCate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlogCategory = action.payload;
      })
      .addCase(createBlogCate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        console.log(state.message)
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogCategorySlice.reducer;
