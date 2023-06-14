"use client";
import { getError } from '@/lib/getError';
import { IPost, IUser } from '@/types/typescript';
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const getPosts = createAsyncThunk(
    "post/getPosts",
    async (access_token: string, thunkAPI) => {
        try {
            const res = await axios.get(`${process.env.API}/api/post`, { headers: { Authorization: access_token } });
            return thunkAPI.fulfillWithValue(res.data);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(getError(error));
        }
    }
);

export interface PostState {
    message: string | null,
    posts: IPost[],
    isError: boolean;
    loading: boolean;
}

const initialState: PostState = {
    message: null,
    posts: [],
    isError: false,
    loading: false,
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<PostState>) => {
        // Get Posts
        builder.addCase(getPosts.pending, (state: PostState) => {
            return { ...state, message: null, isError: false, loading: true };
        });
        builder.addCase(getPosts.fulfilled, (state: PostState, action) => {
            // toast.success(`${action.payload.msg}`);
            return {
                ...state,
                posts: action.payload.posts,
                message: action.payload.msg,
                loading: false
            };
        });
        builder.addCase(
            getPosts.rejected,
            (state: PostState, action) => {
                toast.error(`${action.payload}`);
                return { ...state, message: action.payload as string, isError: true, loading: false };
            }
        );
    }
});

// Action creators are generated for each case reducer function
export const { } = postSlice.actions;

export default postSlice.reducer;