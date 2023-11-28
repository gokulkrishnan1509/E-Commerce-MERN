import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

const initialState = {
  colors: [],
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
      });
  },
});

export default colorSlice.reducer;
