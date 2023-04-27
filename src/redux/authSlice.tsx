import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "types";
import { mockUserList } from "mocks/mocks";

type TAuthState = {
  user: TUser | null;
  users: TUser[];
};

const initialState: TAuthState = {
  user: null,
  users: mockUserList,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.user = action.payload.user;
    },
    logoutSuccess: (state, action: PayloadAction<any>) => {
      state.user = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
