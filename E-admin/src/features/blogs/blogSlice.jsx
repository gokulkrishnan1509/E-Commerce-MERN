import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";
export const getBlogs = createAsyncThunk("blog/get-blog", async (thunkAPI) => {
  try {
    const response = await blogService.getBlog();
    return response.getBlogs;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const postBlogs = createAsyncThunk(
  "blog/post-blog",
  async (blog, thunkAPI) => {
    try {
      const response = await blogService.createBlog(blog);
      return response.newBlog;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOneBlogFromServer = createAsyncThunk(
  "blog/get-one",
  async (id, thunkAPI) => {
    try {
      const response = await blogService.getOneBlog(id);
      return response.data
      ;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateOneBlogToServer = createAsyncThunk(
  "blog/update-one",
  async (data, thunkAPI) => {
    try {
      const response = await blogService.updateBlog(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteOneBlogToServer = createAsyncThunk(
  "blog/delete-one",
  async (id, thunkAPI) => {
    try {
      const response = await blogService.deleteBlog(id);
      thunkAPI.dispatch(getBlogs());
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

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
      })
      .addCase(postBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdBlog = action.payload;
      })
      .addCase(postBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteOneBlogToServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOneBlogToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedBlog = action.payload;
      })
      .addCase(deleteOneBlogToServer.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(updateOneBlogToServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOneBlogToServer.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.updatedBlog = action.payload;
      })
      .addCase(updateOneBlogToServer.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(getOneBlogFromServer.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getOneBlogFromServer.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.blogName = action.payload.title;
        state.blogDesc =action.payload.description;
        state.blogCategory =action.payload.category;
        state.blogImages =action.payload.images;
      })
      .addCase(getOneBlogFromServer.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;
