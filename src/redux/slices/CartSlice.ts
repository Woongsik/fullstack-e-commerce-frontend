import { ActionReducerMapBuilder, PayloadAction, createSlice } from "@reduxjs/toolkit";
import CartSliceUtil from "../utils/CartSliceUtil";
import { CartItem, CartItemBase } from "../../misc/types/CartItem";

export type InitialState = {
  cartItems: CartItem[];
  cartFavorites: CartItemBase[];
  error?: string;
}

export const initialState: InitialState = {
  cartItems: [],
  cartFavorites: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
   // - cart reducer: add product to cart, remove products, update products's quantity in cart
    addToCart: (state, actions: PayloadAction<CartItem>) => {
      const cartItem: CartItem = actions.payload;
      if (!CartSliceUtil.checkIfAlreadyAdded(state.cartItems, cartItem)) {
        state.cartItems.push(cartItem);
      };
    },
    removeFromCart: (state: InitialState, actions: PayloadAction<CartItem>) => {
      const cartItem: CartItem = actions.payload;      
      const foundIndex: number = CartSliceUtil.findIndex(state.cartItems, cartItem);
      if (foundIndex > -1) {
        state.cartItems.splice(foundIndex, 1);
      }
    },
    updateQuantityInCart: (state, actions: PayloadAction<CartItem>) => {
      const cartItem: CartItem = actions.payload;      
      const foundIndex: number = CartSliceUtil.findIndex(state.cartItems, cartItem);
      if (foundIndex > -1) {
        state.cartItems.splice(foundIndex, 1, cartItem);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    addToFavorites: (state, actions: PayloadAction<CartItemBase>) => { 
      const cartItem: CartItemBase = actions.payload;
      if (!CartSliceUtil.checkIfAlreadyAddedInFavorite(state.cartFavorites, cartItem)) {
        state.cartFavorites.push(cartItem);
      };
    },
    removeFromFavorites: (state, actions: PayloadAction<CartItemBase>) => { 
      const favorite: CartItemBase = actions.payload;      
      const foundIndex: number = CartSliceUtil.findIndexInFavorite(state.cartFavorites, favorite);
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
  clearCart,
  addToFavorites,
  removeFromFavorites
} = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;