import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import contactService from "./contactService";
export const resetState = createAction("reset_all");

export const createQuerytoServer = createAsyncThunk(
  "contact/createContact",
  async (contactData, thunkAPI) => {
    try {
      const response = await contactService.postQuery(contactData);
      return response.newEnquiry;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  contact: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const contactSlice = createSlice({
  name: "contact",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createQuerytoServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuerytoServer.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.contact = action.payload;
      })
      .addCase(createQuerytoServer.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default contactSlice.reducer;
