import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "./blogService";
export const getBlogs = createAsyncThunk("blog/get-blog", async (thunkAPI) => {
  try {
    const response = await blogService.getBlog();
    return response.getBlogs;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  blogs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blogs = action.payload;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default blogSlice.reducer;
