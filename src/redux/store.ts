import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import productReducer from "./slices/ProductSlice";
import cartReducer from "./slices/CartSlice";
import userReducer from "./slices/UserSlice";
import categoryReducer from "./slices/CategorySlice";

const store = configureStore ({
  reducer: {
    productReducer,
    cartReducer,
    userReducer,
    categoryReducer
  }
});

export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export const createNewStore = () => { return store }
export default store;