"use client";
import { getError } from '@/lib/getError';
import { IUser } from '@/types/typescript';
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const login = createAsyncThunk(
  "auth/login",
  async (user: any, thunkAPI) => {
    try {
      const res = await axios.post(`${process.env.API}/api/auth/login`, user);
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
}

const initialState: AuthState = {
  user: null,
  access_token: null,
  message: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder.addCase(login.pending, (state: AuthState) => {
      return { ...state, message: null, access_token: null };
    });
    builder.addCase(login.fulfilled, (state: AuthState, action) => {
      localStorage.user = JSON.stringify(action.payload);
      toast.success(`${action.payload.msg}`);
      return {
        ...state,
        user: action.payload,
        message:action.payload.msg
      };
    });
    builder.addCase(
      login.rejected,
      (state: AuthState, action) => {
        toast.error(`${action.payload}`);
        return { ...state, message: null };
      }
    );
  }
});

// Action creators are generated for each case reducer function
export const { } = authSlice.actions;

export default authSlice.reducer;