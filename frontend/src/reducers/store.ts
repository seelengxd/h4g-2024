import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import twoFaReducer from "./twoFa";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    twoFa: twoFaReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
