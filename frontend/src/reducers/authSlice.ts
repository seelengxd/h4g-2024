import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { type UserMiniData } from "../types/users/users";

interface AuthState {
  user: UserMiniData | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserMiniData>) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;

export const selectUser = (state: RootState): UserMiniData | null =>
  state.auth.user;
export const selectIsLoggedIn = (state: RootState): boolean =>
  state.auth.user !== null;
export const selectIsAdmin = (state: RootState): boolean =>
  state.auth.user !== null && state.auth.user.role === "ADMIN";

export default authSlice.reducer;
