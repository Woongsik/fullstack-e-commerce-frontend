import { ActionReducerMapBuilder, PayloadAction, createSlice } from "@reduxjs/toolkit";
import CartSlicerUtil from "../utils/CartSlicerUtil";
import CartItem from "../../misc/types/CartItem";

type InitialState = {
  cartProducts: CartItem[];
  cartFavorites: CartItem[];
  loading: boolean;
  error?: string;
}

const initialState: InitialState = {
  cartProducts: [],
  cartFavorites: [],
  loading: false
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
   // - cart reducer: add product to cart, remove products, update products's quantity in cart
    addToCart: (state, actions: PayloadAction<CartItem>) => {
      const cartItem: CartItem = actions.payload;
      if (!CartSlicerUtil.checkIfAlreadyAdded(state.cartProducts, cartItem)) {
        state.cartProducts.push(cartItem);
      };
    },
    removeFromCart: (state: InitialState, actions: PayloadAction<CartItem>) => {
      const cartItem: CartItem = actions.payload;      
      const foundIndex: number = CartSlicerUtil.findIndex(state.cartProducts, cartItem);
      if (foundIndex > -1) {
        state.cartProducts.splice(foundIndex, 1);
      }
    },
    updateQuantityInCart: (state, actions: PayloadAction<CartItem>) => {
      const cartItem: CartItem = actions.payload;      
      const foundIndex: number = CartSlicerUtil.findIndex(state.cartProducts, cartItem);
      if (foundIndex > -1) {
        state.cartProducts.splice(foundIndex, 1, cartItem);
      }
    },
    addToFavorites: (state, actions: PayloadAction<CartItem>) => { 
      const cartItem: CartItem = actions.payload;
      if (!CartSlicerUtil.checkIfAlreadyAdded(state.cartFavorites, cartItem)) {
        state.cartFavorites.push(cartItem);
      };
    },
    removeFromFavorites: (state, actions: PayloadAction<CartItem>) => { 
      const cartItem: CartItem = actions.payload;      
      const foundIndex: number = CartSlicerUtil.findIndex(state.cartFavorites, cartItem);
      if (foundIndex > -1) {
        state.cartFavorites.splice(foundIndex, 1);
      }
    }
  },
  extraReducers(builder: ActionReducerMapBuilder<InitialState>) {
    // 
  }
});


export const { 
  addToCart,
  removeFromCart,
  updateQuantityInCart,
  addToFavorites,
  removeFromFavorites
} = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;