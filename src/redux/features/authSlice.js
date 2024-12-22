import { removeFromSessionStorage } from "@/utils/sessionStorage";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: {
    email : 'fdgdfg'
  },
  token: "dfgdfgdfg",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;

      // Set token to cookie for middleware accessibility
      Cookies.set("jus-buy-access-token", token, { path: "/" });
    },

    logout: (state) => {
      // Remove token for cookies
      Cookies.remove("jus-buy-access-token", { path: "/login" });
      removeFromSessionStorage("seller-access-token");

      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
