import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import Product from "../../misc/types/Product";
import Category from "../../misc/types/Category";
import { apiService } from "../../services/APIService";

type InitialState = {
  products: Product[],
  filteredProducts: Product[],
  selectedCategoryId?: number,
  loading: boolean,
  error?: string
}

const initialState: InitialState = {
  products: [],
  filteredProducts: [],
  selectedCategoryId: undefined,
  loading: false,
  error: undefined
};

type fetchAllCategoriesAsyncParams = {
  categoryId?: number,
  page?: number
};

export const fetchAllProductsAsync = createAsyncThunk(
  "fetchAllProductsAsync", 
  async (params: fetchAllCategoriesAsyncParams, { rejectWithValue }) => {
    try {
      const { categoryId, page } = params;
      const response: AxiosResponse = await apiService.getProduct(categoryId, page);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    filterByName: (state, actions: PayloadAction<string>) => {
      state.filteredProducts = state.products.filter((product: Product) => 
        (product.title.toLocaleLowerCase().includes(actions.payload.toLocaleLowerCase())));
    },
    sortByPrices: (state, actions: PayloadAction<Category>) => {

    },
    createProduct: (state, actions: PayloadAction<Product>) => { // for adimin

    },
    updateProduct: (state, actions: PayloadAction<Product>) => {// for adimin

    },
    deleteProduct: (state, actions: PayloadAction<Product>) => {// for adimin

    }
  },
  extraReducers(builder) {
      builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        return {
          ...state,
          products: action.payload,
          loading: false
        }
      });

      builder.addCase(fetchAllProductsAsync.pending, (state, action) => {
        return {
          ...state,
          loading: true
        }
      });

      builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error.message ?? "Unkown error..."
          }
      });
  },
});

export const { 
  filterByName, 
  sortByPrices, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = productSlice.actions;

const productReducer = productSlice.reducer;
export default productReducer;