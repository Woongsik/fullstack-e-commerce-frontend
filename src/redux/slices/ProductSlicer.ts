import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../misc/types/Product";

type InitialState = {
  products: Product[]
}

const initialState: InitialState = {
  products: []
};

const url = "https://api.escuelajs.co/api/v1/products";
export const fetchAllProductsAsync = createAsyncThunk(
  "fetchAllProductsAsync", 
  async () => {
    try {
      const jsonData = await fetch(url);
      const data: Product[] = await jsonData.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return error;
    }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, actions: PayloadAction<string>) => {
      console.log('add Product', actions.payload); // Product id
    }
  },
  extraReducers(builder) {
      builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        if (!(action.payload instanceof Error)) {
          return {
            ...state,
            products: action.payload,
            loading: false
          }
        }
      });

      builder.addCase(fetchAllProductsAsync.pending, (state, action) => {
        return {
          ...state,
          loading: true
        }
      });

      builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
        if (action.payload instanceof Error) {
          return {
            ...state,
            loading: false,
            error: action.payload.message
          }
        }
      });
  },
});

export const { addProduct } = productSlice.actions;

const productReducer = productSlice.reducer;
export default productReducer;