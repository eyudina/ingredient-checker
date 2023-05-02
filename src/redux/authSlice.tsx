import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser, UserRole } from "types/types";
import { mockUserList } from "mocks/mocks";

type TAuthState = {
  user: TUser | null;
  isAdmin: boolean;
  userList: TUser[];
};

const initialState: TAuthState = {
  user: null,
  isAdmin: false,
  userList: mockUserList,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<any>) => {
      const { user, role } = action.payload;
      state.user = user;
      state.isAdmin = role === UserRole.admin;
    },
    logoutSuccess: (state) => {
      state.user = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
