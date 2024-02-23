import { ActionReducerMapBuilder, PayloadAction, createSlice } from "@reduxjs/toolkit";
import Product from "../../misc/types/Product";

type InitialState = {
  user?: string; // User;
  admin: boolean;
  loading: boolean;
  error?: string;
}

const initialState: InitialState = {
  admin: false,
  loading: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // - user reducer: register and login
    register: (state, actions: PayloadAction<Product>) => { // for adimin
      
    },
    login: (state, actions: PayloadAction<Product>) => {

    }
  },
  extraReducers(builder: ActionReducerMapBuilder<InitialState>) {
    // 
  }
});


export const { 
} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;