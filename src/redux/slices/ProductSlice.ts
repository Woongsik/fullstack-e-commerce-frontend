import { 
  ActionReducerMapBuilder, 
  PayloadAction, 
  createAsyncThunk, 
  createSlice } from "@reduxjs/toolkit";

import { apiService } from "../../services/APIService";
import { MinMaxPrice, Product, ProductInfo, ProductUpdate, ProductsList } from "../../misc/types/Product";
import { Filter } from "../../misc/types/Filter";

export type InitialState = {
  products: Product[];
  product: Product | null;
  total: number;
  minMaxPrice: MinMaxPrice;
  filter?: Partial<Filter>;
  loading: boolean;
  error?: string;
}

export const initialState: InitialState = {
  products: [],
  product: null,
  loading: false,
  total: 0,
  minMaxPrice: { min: 0, max: 0 }
};

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async (filter: Partial<Filter>, { rejectWithValue }) => {
    try {
      return apiService.getProducts(filter);
    } catch (e) {
      return rejectWithValue(e);
    }
});

export const fetchProduct = createAsyncThunk(
  "fetchProduct",
  async (productId: string, { rejectWithValue }) => {
    try {
      return apiService.getProduct(productId);
    } catch (e) {
      return rejectWithValue(e);
    }
});

export const registerProduct = createAsyncThunk(
  "registerProduct",
  async (product: ProductInfo, { rejectWithValue }) => {
    try {
      return apiService.registerProduct(product);
    } catch (e) {
      return rejectWithValue(e);
    }
});

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (productUpdate: ProductUpdate, { rejectWithValue }) => {
    try {
      return apiService.updateProduct(productUpdate.item, productUpdate._id);
    } catch (e) {
      return rejectWithValue(e);
    }
});

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (productId: string, { rejectWithValue }) => {
    try {
      return apiService.deleteProduct(productId);
    } catch (e) {
      return rejectWithValue(e);
    }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateFilter: (state, actions: PayloadAction<Partial<Filter>>) => {
      state.filter = actions.payload;
    }
  },
  extraReducers(builder: ActionReducerMapBuilder<InitialState>) {
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        const produtsList: ProductsList = action.payload;

        return {
          ...state,
          products: produtsList.products,
          total: produtsList.total,
          minMaxPrice: produtsList.minMaxPrice,
          loading: false     
        }
      }).addCase(fetchProducts.pending, (state, action) => {
        return {
          ...state,
          products: [],
          loading: true,
          error: undefined
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
          product: null,
          loading: true,
          error: undefined
        }
      }).addCase(fetchProduct.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message ?? "Unkown error..."
        }
      });

      builder.addCase(registerProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        return {
          ...state,
          product: action.payload,
          loading: false
        }
      }).addCase(registerProduct.pending, (state, action) => {
        return {
          ...state,
          product: null,
          loading: true,
          error: undefined        
        }
      }).addCase(registerProduct.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message ?? "Unkown error..."
        }
      });

      builder.addCase(updateProduct.fulfilled, (state, action) => {
        return {
          ...state,
          product: action.payload,
          loading: false
        }
      }).addCase(updateProduct.pending, (state, action) => {
        return {
          ...state,
          product: null,
          loading: true,
          error: undefined        
        }
      }).addCase(updateProduct.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message ?? "Unkown error..."
        }
      });

      builder.addCase(deleteProduct.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          product: null
        }
      }).addCase(deleteProduct.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          error: undefined        
        }
      }).addCase(deleteProduct.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message ?? "Unknow error..."
        }
      });
  },
});

export const { 
  updateFilter
} = productSlice.actions;

const productReducer = productSlice.reducer;
export default productReducer;
