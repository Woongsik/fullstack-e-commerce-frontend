import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import productReducer from "./slices/ProductSlicer";
import categoryReducer from "./slices/CategorySlicer";

const store = configureStore ({
  reducer: {
    productReducer,
    categoryReducer
  }
});

export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export const createNewStore = () => { return store }
export default store;