"use client";
import { getError } from '@/lib/getError';
import { IUser } from '@/types/typescript';
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

export const login = createAsyncThunk(
  "auth/login",
  async (user: any, thunkAPI) => {
    try {
      const res = await axios.post(`${process.env.API}/api/auth/login`, user);
      Cookies.set("refreshtoken", res.data.refresh_token, {
        expires: 7,
        path: "api/auth/accessToken"
      });
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getError(error));
    }
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async (user: any, thunkAPI) => {
    try {
      const res = await axios.post(`${process.env.API}/api/auth/register`, user);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getError(error));
    }
  }
);

export interface AuthState {
  user: IUser | object | null;
  access_token: string | null;
  message: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  access_token: null,
  message: null,
  isLoggedIn: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state: AuthState, action: any) => {
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        access_token: action.payload.access_token
      };
    },
    logout: (state: AuthState) => {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        access_token: null
      };
    }

  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder.addCase(login.pending, (state: AuthState) => {
      return { ...state, message: null, access_token: null, isLoggedIn: false };
    });
    builder.addCase(login.fulfilled, (state: AuthState, action) => {
      localStorage.setItem("firstLogin", JSON.stringify(true));
      toast.success(`${action.payload.msg}`);
      return {
        ...state,
        user: action.payload,
        message: action.payload.msg,
        isLoggedIn: true
      };
    });
    builder.addCase(
      login.rejected,
      (state: AuthState, action) => {
        toast.error(`${action.payload}`);
        return { ...state, message: action.payload as string };
      }
    );
    // register
    builder.addCase(register.pending, (state: AuthState) => {
      return { ...state, message: null, access_token: null, isLoggedIn: false };
    });
    builder.addCase(register.fulfilled, (state: AuthState, action) => {
      toast.success(`${action.payload.msg}`);
      return {
        ...state,
        user: action.payload,
        message: action.payload.msg,
        isLoggedIn: false
      };
    });
    builder.addCase(
      register.rejected,
      (state: AuthState, action) => {
        toast.error(`${action.payload}`);
        return { ...state, message: action.payload as string };
      }
    );
  }
});

// Action creators are generated for each case reducer function
export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;