import { ActionReducerMapBuilder, PayloadAction, createSlice } from "@reduxjs/toolkit";
import CartSliceUtil from "../utils/CartSliceUtil";
import { CartItem, CartItemBase } from "../../misc/types/CartItem";

export type InitialState = {
  cartItems: CartItem[];
  cartFavorites: CartItemBase[];
  total: number;
  deliveryFee: number;
  error?: string;
}

export const initialState: InitialState = {
  cartItems: [],
  cartFavorites: [],
  total: 0,
  deliveryFee: 5
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
        state.total = CartSliceUtil.calculateTotal(state.cartItems, state.deliveryFee);
      };

    },
    removeFromCart: (state: InitialState, actions: PayloadAction<CartItem>) => {
      const cartItem: CartItem = actions.payload;      
      const foundIndex: number = CartSliceUtil.findIndex(state.cartItems, cartItem);
      if (foundIndex > -1) {
        state.cartItems.splice(foundIndex, 1);
        state.total = CartSliceUtil.calculateTotal(state.cartItems, state.deliveryFee);
      }
    },
    updateQuantityInCart: (state, actions: PayloadAction<CartItem>) => {
      const cartItem: CartItem = actions.payload;      
      const foundIndex: number = CartSliceUtil.findIndex(state.cartItems, cartItem);
      if (foundIndex > -1) {
        state.cartItems.splice(foundIndex, 1, cartItem);
        state.total = CartSliceUtil.calculateTotal(state.cartItems, state.deliveryFee);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.total = CartSliceUtil.calculateTotal(state.cartItems, state.deliveryFee);
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
