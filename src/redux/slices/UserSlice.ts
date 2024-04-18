import { ActionReducerMapBuilder, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { LoginInfo, RegisterUserInfo, User, UserToken } from "../../misc/types/User";
import { apiService } from "../../services/APIService";
import { userSlicerUtil } from "../utils/UserSlicerUtil";

export type InitialState = {
  user: User | null; // User;
  loading: boolean;
  error?: string;
}

export const initialState: InitialState = {
  user: null,
  loading: false
};

export const registerUser = createAsyncThunk(
  "registerUser",
  async (userInfo: RegisterUserInfo, { rejectWithValue }) => {
    try {
      return apiService.registerUser(userInfo);
    } catch (e) {
      return rejectWithValue(e);
    }
});

export const loginUser = createAsyncThunk(
  "loginUser",
  async (userInfo: LoginInfo, { rejectWithValue }) => {
    try {
      return apiService.login(userInfo);
    } catch (e) {
      return rejectWithValue(e);
    }
});

export const getUserWithSession = createAsyncThunk(
  "getUserWithSession",
  async (_, { rejectWithValue }) => {
    try {
      return apiService.getUserWithSession();
    } catch (e) {
      return rejectWithValue(e);
    }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, actions: PayloadAction<User>) => {
      state.user = actions.payload;
    },
    logout: (state) => {
      userSlicerUtil.removeTokensFromLocalStorage();
      state.user = null;
    }
  },
  extraReducers(builder: ActionReducerMapBuilder<InitialState>) {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false      
      }
    }).addCase(registerUser.pending, (state, action: PayloadAction) => {
      return {
        ...state,
        loading: true,
        error: undefined
      }
    }).addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        user: null,
        loading: false,
        error: action.error.message ?? "Unkown error..."
      }
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      userSlicerUtil.setTokensToLocalStorage(action.payload);

      return {
        ...state,
        user: action.payload.user,
        loading: false      
      }
    }).addCase(loginUser.pending, (state, action) => {
      return {
        ...state,
        loading: true,
        error: undefined
      }
    }).addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        user: null,
        loading: false,
        error: action.error.message ?? "Unkown error..."
      }
    });

    builder.addCase(getUserWithSession.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload,
        loading: false     
      }
    }).addCase(getUserWithSession.pending, (state, action) => {
      return {
        ...state,
        loading: true,
        error: undefined
      }
    }).addCase(getUserWithSession.rejected, (state, action) => {
      userSlicerUtil.removeTokensFromLocalStorage();
      
      return {
        ...state,
        user: null,
        loading: false,
        error: action.error.message ?? "Unkown error..."
      }
    });
  }
});

export const { 
  logout,
  addUser
} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;