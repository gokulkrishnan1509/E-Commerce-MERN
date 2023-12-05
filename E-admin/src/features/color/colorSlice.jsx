import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import colorService from "./colorService";
export const getColorsFromServer = createAsyncThunk(
  "color/get-colors",
  async (thunkApi) => {
    try {
      const response = await colorService.getColor();
      return response.getAllColores;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createColorToDb = createAsyncThunk(
  "color/add-color",
  async (data, thunkApi) => {
    try {
      const response = await colorService.createColor(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getOneColorFromDb = createAsyncThunk(
  "color/get-one-color",
  async (id, thunkApi) => {
    try {
      const response = await colorService.getOneColor(id);
      return response.getOneColorId;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateColorToServer = createAsyncThunk(
  "color/update-color",
  async (data, thunkApi) => {
    try {
      const response = await colorService.updateOnecolor(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteColorFromServer = createAsyncThunk(
  "color/delete-color",
  async (id, thunkApi) => {
    try {
      const response = await colorService.deleteColor(id);
      thunkApi.dispatch(getColorsFromServer());
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("RevertAll");

const initialState = {
  colors: [],
  createdColor: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColorsFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColorsFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = action.payload;
      })
      .addCase(getColorsFromServer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createColorToDb.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createColorToDb.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdColor = action.payload;
      })
      .addCase(createColorToDb.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getOneColorFromDb.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneColorFromDb.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colorTitle = action.payload.title;
      })
      .addCase(getOneColorFromDb.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateColorToServer.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(updateColorToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedColor = action.payload;
      })
      .addCase(updateColorToServer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteColorFromServer.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteColorFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedProduct = action.payload;
      })
      .addCase(deleteColorFromServer.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetState, () => initialState);
  },
});

export default colorSlice.reducer;
