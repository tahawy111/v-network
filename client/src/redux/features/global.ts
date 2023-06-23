"use client";

import { createSlice } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';


export interface GlobalState {
  isLoading: boolean;
  status: {
    statusModalShow: boolean;
  };
  profileId: string;
  socket: Socket | null;
}

const initialState: GlobalState = {
  isLoading: false,
  status: {
    statusModalShow: false,
  },
  profileId: "",
  socket: null
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
    setSocket: (state, action) => {
      return { ...state, socket: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoading, stopLoading, setStatusModalShow, setProfileId, setSocket } = authSlice.actions;

export default authSlice.reducer;