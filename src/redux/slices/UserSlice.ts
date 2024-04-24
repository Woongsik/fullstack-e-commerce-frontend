import { ActionReducerMapBuilder, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { LoginInfo, PasswordUpdate, RegisterUserInfo, User } from "../../misc/types/User";
import { apiService } from "../../services/APIService";
import { localStorageUtil } from "../utils/LocalStrorageUtil";

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

export const updateUser = createAsyncThunk(
  "updateUser",
  async (userInfo: Partial<RegisterUserInfo>, { rejectWithValue }) => {
    try {
      return apiService.updateUser(userInfo);
    } catch (e) {
      return rejectWithValue(e);
    }
});

export const updateUserPassword = createAsyncThunk(
  "updateUser",
  async (passwordInfo: PasswordUpdate, { rejectWithValue }) => {
    try {
      return apiService.updateUserPassword(passwordInfo);
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

export const loginWithGoogle = createAsyncThunk(
  "loginWithGoogle",
  async (credential: string, { rejectWithValue }) => {
    try {
      return apiService.loginWithGoogle(credential);
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
    clearError: (state, actions: PayloadAction<void>) => {
      state.error = '';
      state.loading = false;
    },
    logout: (state) => {
      localStorageUtil.removeTokens();
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

    builder.addCase(updateUser.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload,
        loading: false      
      }
    }).addCase(updateUser.pending, (state, action: PayloadAction) => {
      return {
        ...state,
        loading: true,
        error: undefined
      }
    }).addCase(updateUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? "Unkown error..."
      }
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      localStorageUtil.setTokens(action.payload);

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

    builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
      localStorageUtil.setTokens(action.payload);

      return {
        ...state,
        user: action.payload.user,
        loading: false      
      }
    }).addCase(loginWithGoogle.pending, (state, action) => {
      return {
        ...state,
        loading: true,
        error: undefined
      }
    }).addCase(loginWithGoogle.rejected, (state, action) => {
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
      localStorageUtil.removeTokens();
      
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
  addUser,
  clearError
} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;