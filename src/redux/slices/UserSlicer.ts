import { ActionReducerMapBuilder, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

import { LoginUserInfo, RegisterUserInfo, User, UserToken } from "../../misc/types/User";
import { apiService } from "../../services/APIService";
import { userSlicerUtil } from "../utils/UserSlicerUtil";

type InitialState = {
  user: User | null; // User;
  admin: boolean;
  loading: boolean;
  error?: string;
}

const initialState: InitialState = {
  user: null,
  admin: false,
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
  async (userInfo: LoginUserInfo, { rejectWithValue }) => {
    try {
      return apiService.loginUser(userInfo);
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
    logout: (state) => {
      userSlicerUtil.removeTokensFromLocalStorage();
      state.user = null;
    }
  },
  extraReducers(builder: ActionReducerMapBuilder<InitialState>) {
    // 
    builder.addCase(registerUser.fulfilled, (state, action) => {
      console.log('register user', action.payload);
      return {
        ...state,
        loading: false      }
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
      console.log('login: ', action.payload);
      userSlicerUtil.setTokensToLocalStorage(action.payload);

      return {
        ...state,
        loading: false      }
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
      console.log('get with user session: ', action.payload);

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
  logout
} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;