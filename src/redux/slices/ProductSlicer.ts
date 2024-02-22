import { 
  ActionReducerMapBuilder, 
  PayloadAction, 
  createAsyncThunk, 
  createSlice } from "@reduxjs/toolkit";

import { apiService } from "../../services/APIService";
import ProductSliceUtils from "../utils/ProductSliceUtils";

import Product from "../../misc/types/Product";
import Filter from "../../misc/types/Filter";
import Sort from "../../misc/types/Sort";

type InitialState = {
  products: Product[];
  product: Product | null;
  sort?: Sort;
  sortedProducts: Product[];
  loading: boolean;
  error?: string;
}

const initialState: InitialState = {
  products: [],
  sortedProducts: [],
  product: null,
  loading: false
};

export const fetchProducts = createAsyncThunk(
  "fetchProducts", // get all products, by categories, by page, by itemsPerPage
  async (filter: Filter, { rejectWithValue }) => {
    try {
      return apiService.getProducts(filter);
    } catch (e) {
      return rejectWithValue(e);
    }
});

export const fetchProduct = createAsyncThunk(
  "fetchProduct", // get a product
  async (productId: string, { rejectWithValue }) => {
    try {
      return apiService.getProduct(productId);
    } catch (e) {
      return rejectWithValue(e);
    }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    sortBy: (state, actions: PayloadAction<Sort>) => {
      state.sort = actions.payload;
      state.sortedProducts = ProductSliceUtils.sortProducts(state.products, actions.payload);
    },
    createProduct: (state, actions: PayloadAction<Product>) => { // for adimin
    
    },
    updateProduct: (state, actions: PayloadAction<Product>) => { // for adimin

    },
    deleteProduct: (state, actions: PayloadAction<Product>) => { // for adimin

    }
  },
  extraReducers(builder: ActionReducerMapBuilder<InitialState>) {
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        return {
          ...state,
          products: action.payload,
          sortedProducts: ProductSliceUtils.sortProducts(action.payload, state.sort),
          loading: false     
        }
      }).addCase(fetchProducts.pending, (state, action) => {
        return {
          ...state,
          loading: true
        }
      }).addCase(fetchProducts.rejected, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error.message ?? "Unkown error..."
          }
      });

      builder.addCase(fetchProduct.fulfilled, (state, action) => {
        return {
          ...state,
          product: action.payload,
          loading: false
        }
      }).addCase(fetchProduct.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          product: null
        }
      }).addCase(fetchProduct.rejected, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error.message ?? "Unkown error..."
          }
      });
  },
});

export const { 
  sortBy,
  createProduct, 
  updateProduct, 
  deleteProduct 
} = productSlice.actions;

const productReducer = productSlice.reducer;
export default productReducer;
