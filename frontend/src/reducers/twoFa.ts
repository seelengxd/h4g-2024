import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { type UserTwoFaData } from "../types/twoFa/twoFa";

interface TwoFaState {
  hasTwoFaSession: boolean;
  requiresTwoFa: boolean;
}

const initialState: TwoFaState = {
  hasTwoFaSession: false,
  requiresTwoFa: false,
};

export const twoFaSlice = createSlice({
  name: "twoFa",
  initialState,
  reducers: {
    setUserTwoFaData: (state, action: PayloadAction<UserTwoFaData>) => {
      state.hasTwoFaSession = action.payload.hasTwoFaSession;
      state.requiresTwoFa = action.payload.requiresTwoFa;
    },
    setHasTwoFaSession: (state, action: PayloadAction<UserTwoFaData>) => {
      state.hasTwoFaSession = action.payload.hasTwoFaSession;
    },
    setRequiresTwoFa: (state, action: PayloadAction<boolean>) => {
      state.requiresTwoFa = action.payload;
    },
    resetTwoFa: (state) => {
      state = initialState;
    },
  },
});

export const {
  setUserTwoFaData,
  setHasTwoFaSession,
  setRequiresTwoFa,
  resetTwoFa,
} = twoFaSlice.actions;

export const selectHasTwoFaSession = (state: RootState): boolean =>
  state.twoFa.hasTwoFaSession;
export const selectRequiresTwoFa = (state: RootState): boolean =>
  state.twoFa.requiresTwoFa;
export const selectRequireTwoFaAuthentication = (state: RootState): boolean =>
  state.twoFa.requiresTwoFa && !state.twoFa.hasTwoFaSession;

export default twoFaSlice.reducer;
