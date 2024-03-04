import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Category from "../../misc/types/Category";
import { apiService } from "../../services/APIService";

export type InitialState = {
  categories: Category[],
  loading: boolean,
  error?: string
}

export const initialState: InitialState = {
  categories: [],
  loading: true
};

export const fetchAllCategoriesAsync = createAsyncThunk(
  "fetchAllCategoriesAsync", 
  async (_, { rejectWithValue }) => {
    try {
      return apiService.getCategories();
    } catch (e) {
      return rejectWithValue(e);
    }
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
  },
  extraReducers(builder) {
      builder.addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        return {
          ...state,
          categories: action.payload,
          loading: false
        }
      });

      builder.addCase(fetchAllCategoriesAsync.pending, (state, action) => {
        return {
          ...state,
          loading: true
        }
      });

      builder.addCase(fetchAllCategoriesAsync.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message ?? "Unkown error..."
        }
      });
  },
});

const categoryReducer = categorySlice.reducer;
export default categoryReducer;