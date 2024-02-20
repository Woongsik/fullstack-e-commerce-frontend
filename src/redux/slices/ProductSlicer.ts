import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import Product from "../../misc/types/Product";
import { apiService } from "../../services/APIService";
import Filter from "../../misc/types/Filter";

type InitialState = {
  products: Product[];
  loading: boolean;
  error?: string;
}

const initialState: InitialState = {
  products: [],
  loading: false,
  error: undefined
};

export const fetchProducts = createAsyncThunk(
  "fetchProducts", // get all products, by categories, by page, by itemsPerPage, sort by prices
  async (filter: Filter, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await apiService.getProducts(filter);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
});

export const fetchProduct = createAsyncThunk(
  "fetchProduct", 
  async (productId: number, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await apiService.getProduct(productId);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
});

// - product reducer: 
// get all products, 
// find a single products, 
// filter products by categories, 
// sort products by price. 
// Create, update and delete a product (enable update & delete features only for admin of the webapp)

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    createProduct: (state, actions: PayloadAction<Product>) => { // for adimin

    },
    updateProduct: (state, actions: PayloadAction<Product>) => { // for adimin

    },
    deleteProduct: (state, actions: PayloadAction<Product>) => { // for adimin

    }
  },
  extraReducers(builder) {
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        return {
          ...state,
          products: action.payload,
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
  },
});

export const { 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = productSlice.actions;

const productReducer = productSlice.reducer;
export default productReducer;