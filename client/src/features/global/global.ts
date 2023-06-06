"use client";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface GlobalState {
  isLoading: boolean;
  status: {
    statusModalShow: boolean;
  };
}

const initialState: GlobalState = {
  isLoading: false,
  status: {
    statusModalShow: false
  }
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    startLoading: (state) => {
      return { ...state, isLoading: true };
    },
    stopLoading: (state) => {
      return { ...state, isLoading: false };
    },
    setStatusModalShow: (state, action) => {
      return { ...state, status: { statusModalShow: action.payload } };
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoading, stopLoading, setStatusModalShow } = globalSlice.actions;

export default globalSlice.reducer;