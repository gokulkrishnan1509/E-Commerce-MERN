import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
      }).addCase(getCategory.rejected,(state,action)=>{
        state.isLoading=false;
        state.isError=true;
        state.isSuccess=false;
        state.message=action.error
      })
      
  },
});

export default categorySlice.reducer;
