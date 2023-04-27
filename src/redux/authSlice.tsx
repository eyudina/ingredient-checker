import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "types";

type TAuthState = {
  isAuthenticated: boolean;
  user: {
    email: string;
    role: TUser["role"];
  } | null;
};

const initialState: TAuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailure: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutSuccess: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, loginFailure, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
