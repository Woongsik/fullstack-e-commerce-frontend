import { ActionReducerMapBuilder, PayloadAction, createSlice } from "@reduxjs/toolkit";
import CartSliceUtil from "../utils/CartSliceUtil";
import CartItem from "../../misc/types/CartItem";

type InitialState = {
  cartItems: CartItem[];
  cartFavorites: CartItem[];
  error?: string;
}

const initialState: InitialState = {
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
    addToFavorites: (state, actions: PayloadAction<CartItem>) => { 
      const cartItem: CartItem = actions.payload;
      if (!CartSliceUtil.checkIfAlreadyAdded(state.cartFavorites, cartItem)) {
        state.cartFavorites.push(cartItem);
      };
    },
    removeFromFavorites: (state, actions: PayloadAction<CartItem>) => { 
      const cartItem: CartItem = actions.payload;      
      const foundIndex: number = CartSliceUtil.findIndex(state.cartFavorites, cartItem);
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