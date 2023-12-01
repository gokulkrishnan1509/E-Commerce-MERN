import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import colorService from "./colorService";
// import { createColor } from "../../../../E-backend/controller/colorController";
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
      });
  },
});

export default colorSlice.reducer;
