import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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

export const deleteProductCateServer = createAsyncThunk(
  "delete/productcategory",
  async (id, thunkAPI) => {
    try {
      const response = await categoryService.deleteOneCateProduct(id);
      thunkAPI.dispatch(getCategory());

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductCateServer = createAsyncThunk(
  "getOne/productcate",
  async (id, thunkAPI) => {
    try {
      const response = await categoryService.getOneCateProduct(id);
      return response.getCategoryById;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProductCateServer = createAsyncThunk(
  "updateOne/productcate",
  async (data, thunkAPI) => {
    try {
      const response = await categoryService.updateCateProduct(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const resetState = createAction("RevertAll");
const initialState = {
  pCategory: [],
  isError: false,

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
      })
      .addCase(deleteProductCateServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductCateServer.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.deleteProductCate = action.payload;
      })
      .addCase(deleteProductCateServer.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getProductCateServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCateServer.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.getProuduct = action.payload.title;
        // console.log(state.getProuduct)
      })
      .addCase(getProductCateServer.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateProductCateServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductCateServer.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedProduct = action.payload;
      })
      .addCase(updateProductCateServer.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default categorySlice.reducer;
