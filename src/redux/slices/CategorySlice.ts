import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Category, CategoryBase } from "../../misc/types/Category";
import { apiService } from "../../services/APIService";

export type InitialState = {
  categories: Category[],
  category?: Category,
  loading: boolean,
  error?: string
}

export const initialState: InitialState = {
  categories: [],
  loading: false
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
    addCategory: (state, actions: PayloadAction<Category>) => {
      state.categories.push(actions.payload);
    },
    updateCategory: (state, actions: PayloadAction<Category>) => {
      const updatedCategory: Category = actions.payload;
      const index: number = state.categories.findIndex((category: Category) =>
        category._id ===  updatedCategory._id);

      if (index > -1) {
        state.categories.splice(index, 1, updatedCategory);
      }
    },
    deleteCategory: (state, actions: PayloadAction<Category>) => {
      const deletedCategory: Category = actions.payload;
      const index: number = state.categories.findIndex((category: Category) =>
        category._id ===  deletedCategory._id);

      if (index > -1) {
        state.categories.splice(index, 1);
      }    
    }
  },
  extraReducers(builder) {
      builder.addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        return {
          ...state,
          categories: action.payload,
          loading: false
        }
      }).addCase(fetchAllCategoriesAsync.pending, (state, action) => {
        return {
          ...state,
          loading: true
        }
      }).addCase(fetchAllCategoriesAsync.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message ?? "Unkown error..."
        }
      });
  },
});

export const { 
  addCategory,
  updateCategory,
  deleteCategory
} = categorySlice.actions;

const categoryReducer = categorySlice.reducer;
export default categoryReducer;