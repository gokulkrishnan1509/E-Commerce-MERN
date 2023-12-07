import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";

export const getEnquiry = createAsyncThunk(
  "enquery/getEnquery",
  async (thunkAPI) => {
    try {
      const response = await enquiryService.getAllEnquiry();
      return response["getAllQuery"];
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getOneEnquiryFromServer = createAsyncThunk(
  "enquery/getOneEnquery",
  async (id, thunkAPI) => {
    try {
      const response = await enquiryService.getOneEnquiry(id);
      return response.getOneEnquiryById;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUpdateEnqiryFromServer = createAsyncThunk(
  "enquery/getupdatenquery",
  async (data, thunkAPI) => {
    try {
      const response = await enquiryService.updateEnquiry(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteOneEnquiryFromServer = createAsyncThunk(
  "enquery/deletenquery",
  async (id, thunkAPI) => {
    try {
      const response = await enquiryService.deleteEnquiry(id);
      thunkAPI.dispatch(getEnquiry());
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("RevertAll");

const initialState = {
  enquiries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const enquerySlice = createSlice({
  name: "enquery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiry.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.enquiries = action.payload;
      })
      .addCase(getEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getOneEnquiryFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneEnquiryFromServer.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.enqName = action.payload.name;
        state.enqMobile = action.payload.mobile;
        state.enqEmail = action.payload.email;
        state.enqComment = action.payload.comment;
        state.enqStatus = action.payload.status;
      })
      .addCase(getOneEnquiryFromServer.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(getUpdateEnqiryFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUpdateEnqiryFromServer.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.getUpdated = action.payload;
      })
      .addCase(getUpdateEnqiryFromServer.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(deleteOneEnquiryFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOneEnquiryFromServer.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.deleteOneEnquiry = action.payload;
      })
      .addCase(deleteOneEnquiryFromServer.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default enquerySlice.reducer;
