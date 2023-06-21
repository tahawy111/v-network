"use client";
import { getError } from '@/lib/getError';
import { IComment, IPost, IUser } from '@/types/typescript';
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const getPosts = createAsyncThunk(
    "post/getPosts",
    async ({ access_token, page }: { access_token: string, page: number; }, thunkAPI) => {
        try {
            const res = await axios.get(`${process.env.API}/api/post?skip=0&page=${page}&limit=${page * 3}`, { headers: { Authorization: access_token } });
            return thunkAPI.fulfillWithValue(res.data);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(getError(error));
        }
    }
);
export const getUserPosts = createAsyncThunk(
    "post/getUserPosts",
    async ({ id, access_token, page }: { id: string, access_token: string; page: number; }, thunkAPI) => {

        try {
            const res = await axios.get(`${process.env.API}/api/post/userPosts/${id}?page=${page}&limit=${page * 3}`, { headers: { Authorization: access_token } });

            return thunkAPI.fulfillWithValue(res.data);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(getError(error));
        }
    }
);
export const getDiscoverPosts = createAsyncThunk(
    "post/getDiscoverPosts",
    async ({ access_token, page }: { access_token: string; page: number; }, thunkAPI) => {

        try {
            const res = await axios.get(`${process.env.API}/api/post/discover?page=${page}&limit=${page * 3}`, { headers: { Authorization: access_token } });

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
    onEdit: boolean;
    postToEdit: null | IPost;
    userPosts: IPost[];
    page: number;
    postsLength: number;
    isLoading: boolean;
    discoverPosts: IPost[];
}

const initialState: PostState = {
    message: null,
    posts: [],
    isError: false,
    loading: false,
    onEdit: false,
    postToEdit: null,
    userPosts: [],
    page: 1,
    postsLength: 0,
    isLoading: false,
    discoverPosts: [],
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        onEdit: (state: PostState, action) => {
            return { ...state, onEdit: action.payload.onEdit, postToEdit: action.payload.post };
        },
        likePost: (state: PostState, action) => {
            const indexOfPost = state.posts.findIndex((post) => post._id === action.payload.post._id);
            const newPost = { ...action.payload.post, likes: [...action.payload.post.likes, action.payload.auth.user._id] };
            state.posts[indexOfPost] = newPost;
        },
        unLikePost: (state: PostState, action) => {
            const indexOfPost = state.posts.findIndex((post) => post._id === action.payload.post._id);
            state.posts[indexOfPost].likes = state.posts[indexOfPost].likes.filter(like => like === action.payload.post._id);
        },
        createComment: (state: PostState, action) => {
            const indexOfPost = state.posts.findIndex((post) => post._id === action.payload.postId);
            state.posts[indexOfPost].comments.push(action.payload);
        },
        updateComment: (state: PostState, action) => {
            const indexOfPost = state.posts.findIndex((post) => post._id === action.payload.postId);
            const indexOfComment = state.posts[indexOfPost].comments.findIndex((comment: IComment) => comment._id === action.payload.comment._id);
            state.posts[indexOfPost].comments[indexOfComment] = action.payload.comment;
        },
        likeComment: (state: PostState, action) => {
            const indexOfPost = state.posts.findIndex((post) => post._id === action.payload.postId);
            const indexOfComment = state.posts[indexOfPost].comments.findIndex((comment: IComment) => comment._id === action.payload.comment._id);
            state.posts[indexOfPost].comments[indexOfComment] = action.payload.comment;
        },
        unLikeComment: (state: PostState, action) => {
            const indexOfPost = state.posts.findIndex((post) => post._id === action.payload.postId);
            const indexOfComment = state.posts[indexOfPost].comments.findIndex((comment: IComment) => comment._id === action.payload.comment._id);
            state.posts[indexOfPost].comments[indexOfComment] = action.payload.comment;
        },
        increasePage: (state: PostState, action) => {
            state.page += action.payload;
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<PostState>) => {
        // Get Posts
        builder.addCase(getPosts.pending, (state: PostState) => {
            return { ...state, message: null, isError: false, isLoading: true };
        });
        builder.addCase(getPosts.fulfilled, (state: PostState, action) => {
            // toast.success(`${action.payload.msg}`);
            return {
                ...state,
                posts: action.payload.posts,
                postsLength: action.payload.postsLength,
                message: action.payload.msg,
                isLoading: false
            };
        });
        builder.addCase(
            getPosts.rejected,
            (state: PostState, action) => {
                toast.error(`${action.payload}`);
                return { ...state, message: action.payload as string, isError: true, isLoading: false };
            }
        );
        // Get User Posts
        builder.addCase(getUserPosts.pending, (state: PostState) => {
            return { ...state, message: null, isError: false, isLoading: true };
        });
        builder.addCase(getUserPosts.fulfilled, (state: PostState, action) => {
            // toast.success(`${action.payload.msg}`);
            return {
                ...state,
                userPosts: action.payload.posts,
                message: action.payload.msg,
                postsLength: action.payload.postsLength,
                isLoading: false
            };
        });
        builder.addCase(
            getUserPosts.rejected,
            (state: PostState, action) => {
                toast.error(`${action.payload}`);
                return { ...state, message: action.payload as string, isError: true, isLoading: false };
            }
        );
        // Get Discover Posts
        builder.addCase(getDiscoverPosts.pending, (state: PostState) => {
            return { ...state, message: null, isError: false, isLoading: true };
        });
        builder.addCase(getDiscoverPosts.fulfilled, (state: PostState, action) => {
            // toast.success(`${action.payload.msg}`);
            return {
                ...state,
                discoverPosts: action.payload.posts,
                message: action.payload.msg,
                postsLength: action.payload.postsLength,
                isLoading: false
            };
        });
        builder.addCase(
            getDiscoverPosts.rejected,
            (state: PostState, action) => {
                toast.error(`${action.payload}`);
                return { ...state, message: action.payload as string, isError: true, isLoading: false };
            }
        );
    }
});

// Action creators are generated for each case reducer function
export const { onEdit, likePost, unLikePost, createComment, updateComment, likeComment, unLikeComment, increasePage } = postSlice.actions;

export default postSlice.reducer;