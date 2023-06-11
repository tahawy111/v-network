"use client";

import { createSlice } from '@reduxjs/toolkit';


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


export const authSlice = createSlice({
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
export const { startLoading, stopLoading, setStatusModalShow } = authSlice.actions;

export default authSlice.reducer;