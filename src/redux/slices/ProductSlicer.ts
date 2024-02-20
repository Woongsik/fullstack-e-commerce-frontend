import { 
  ActionReducerMapBuilder, 
  PayloadAction, 
  createAsyncThunk, 
  createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import { apiService } from "../../services/APIService";
import Product from "../../misc/types/Product";
import Filter from "../../misc/types/Filter";
import Sort from "../../misc/types/Sort";

type InitialState = {
  products: Product[];
  product?: Product;
  filteredProducts: Product[];
  sorted?: Sort;
  loading: boolean;
  error?: string;
}

const initialState: InitialState = {
  products: [],
  filteredProducts: [],
  loading: false
};

export const fetchProducts = createAsyncThunk(
  "fetchProducts", // get all products, by categories, by page, by itemsPerPage
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
    sortBy: (state, actions: PayloadAction<Sort>) => {
      console.log('sort by price', actions.payload);
      state.sorted = actions.payload;
      const sortType: Sort = actions.payload;

      if (sortType === Sort.HIGHEST_PRICES) {
        state.filteredProducts = [...state.products].sort((a: Product, b: Product) => (b.price - a.price));
      } else if (sortType === Sort.LOWEST_PRICES) {
        state.filteredProducts = [...state.products].sort((a: Product, b: Product) => (a.price - b.price));
      } else if (sortType === Sort.LATEST_CREATED) {
        state.filteredProducts = [...state.products].sort((a: Product, b: Product) => 1);
      } // else if (sortType === Sort.OLDEST_CREATED) {
      //   state.filteredProducts = [...state.products].sort((a: Product, b: Product) => 
      //   (a.creationAt - b.creationAt));
      // } else if (sortType === Sort.LATEST_UPDATED) {
      //   state.filteredProducts = [...state.products].sort((a: Product, b: Product) => 
      //   (b.updatedAt - a.updatedAt));
      // } else if (sortType === Sort.OLDEST_UPDATED) {
      //   state.filteredProducts = [...state.products].sort((a: Product, b: Product) => 
      //   (a.updatedAt - b.updatedAt));
      // } 
      
      console.log('sorted', state.filteredProducts);
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
        console.log('this', this, state.sorted);
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

      builder.addCase(fetchProduct.fulfilled, (state, action) => {
        return {
          ...state,
          product: action.payload,
          loading: false
        }
      }).addCase(fetchProduct.pending, (state, action) => {
        return {
          ...state,
          loading: true
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