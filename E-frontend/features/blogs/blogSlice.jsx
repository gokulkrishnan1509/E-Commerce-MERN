import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import BlogService from "./blogService";

export const resetState = createAction("Reset_all");

export const getAllBlogs = createAsyncThunk(
  "blog/getslice",
  async (thunkAPI) => {
    try {
      const response = await BlogService.getBlogs();
      return response.getBlogs;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOneBlogFromServer = createAsyncThunk(
  "blog/getOneBlog",
  async (id, thunkAPI) => {
    try {
      const response = await BlogService.getOneBlog(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  blog: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.blog = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getOneBlogFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneBlogFromServer.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.oneBlog = action.payload.data;
      })
      .addCase(getOneBlogFromServer.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(resetState, () => {
        initialState;
      });
  },
});

export default blogSlice.reducer;
