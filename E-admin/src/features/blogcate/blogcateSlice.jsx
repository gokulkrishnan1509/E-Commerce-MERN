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

export const getOneBlogCateFromServer = createAsyncThunk(
  "blog/getOneproductBlog",
  async (id, thunkAPI) => {
    try {
      const response = await blogCateSerivce.getOneBlogCate(id);
      return response.getOneCategory;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateOneBlogCateFromServer = createAsyncThunk(
  "blog/updateOneBlog",
  async (data, thunkAPI) => {
    try {
      const response = await blogCateSerivce.updateOneBlogCate(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteOneBlogCateFromServer = createAsyncThunk(
  "blog/deleteOneBlog",
  async (id, thunkAPI) => {
    try {
      const response = await blogCateSerivce.deleteOneBlog(id);
      thunkAPI.dispatch(getBlogCate())
      response;
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
      })
      .addCase(getOneBlogCateFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneBlogCateFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getOneBlog = action.payload.title;
      })
      .addCase(getOneBlogCateFromServer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateOneBlogCateFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOneBlogCateFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBlog = action.payload;
      })
      .addCase(updateOneBlogCateFromServer.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteOneBlogCateFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOneBlogCateFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBlog = action.payload;
      })
      .addCase(deleteOneBlogCateFromServer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogCategorySlice.reducer;
