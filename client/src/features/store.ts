import { configureStore } from '@reduxjs/toolkit';
import counterSlice from "./counter/counter";
import authSlice from "./auth/authSlice";
import globalSlice from "./global/global";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    auth: authSlice,
    global: globalSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;