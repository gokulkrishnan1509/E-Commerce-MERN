import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import brandService from "./brandService";

export const getBrands = createAsyncThunk(
  "brand/get-brand",
  async (thunkAPI) => {
    try {
      const response = await brandService.getBrand();
      return response.getAllBrand;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBrand = createAsyncThunk(
  "brand/create-brand",
  async (brandData, thunkAPI) => {
    try {
      const response = await brandService.createBrand(brandData);
      return response.newBrand;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getoneBrandFromServer = createAsyncThunk(
  "brand/get-onebrand",
  async (id, thunkAPI) => {
    try {
      const response = await brandService.getOneBrand(id);
      return response.getOneId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBrandToServer = createAsyncThunk(
  "brand/update-brand",
  async (brand, thunkAPI) => {
    try {
      
      const response = await brandService.updateBrand(brand);
       thunkAPI.dispatch(getBrands())
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBrandToServer = createAsyncThunk(
  "brand/delete-brand",
  async (id, thunkAPI) => {
    try {
      const response = await brandService.deleteBrand(id);
      thunkAPI.dispatch(getBrands());

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");
const initialState = {
  brands: [],
  // createdBrandDB: undefined,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBrand = action.payload;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getoneBrandFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getoneBrandFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brandName = action.payload.title;
      })
      .addCase(getoneBrandFromServer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.message;
      })
      .addCase(updateBrandToServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBrandToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBrand = action.payload;
      })
      .addCase(updateBrandToServer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteBrandToServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrandToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBrand = action.payload;
      })
      .addCase(deleteBrandToServer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default brandSlice.reducer;
