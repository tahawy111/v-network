"use client";

import { createSlice } from '@reduxjs/toolkit';


export interface GlobalState {
  isLoading: boolean;
  status: {
    statusModalShow: boolean;
  };
  profileId: string;
}

const initialState: GlobalState = {
  isLoading: false,
  status: {
    statusModalShow: false,
  },
  profileId: ""
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
    setProfileId: (state, action) => {
      return { ...state, profileId: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoading, stopLoading, setStatusModalShow, setProfileId } = authSlice.actions;

export default authSlice.reducer;