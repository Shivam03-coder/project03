import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

const initialState = {
  UserRegisterd: localStorage.getItem("userInfo") ? true : false,
  isUserAuthenticated: (() => {
    const cookie = Cookie.get("isUserAuthenticated");
    try {
      return cookie ? JSON.parse(cookie) : false;
    } catch (e) {
      console.error("Error parsing isUserAuthenticated cookie:", e);
      return false;
    }
  })(),
};

export const userauthSlice = createSlice({
  name: "userstate",
  initialState,
  reducers: {
    setUsercredentials: (state, action) => {
      state.UserRegisterd = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },

    setIsUserAuthenticated: (state, action) => {
      state.isUserAuthenticated = action.payload;
      Cookie.set("isUserAuthenticated", JSON.stringify(action.payload), {
        expires: 5, 
        path: '/', 
      });
    },

    clearIsUserAuthenticated: (state) => {
      state.isUserAuthenticated = false;
      Cookie.remove("isUserAuthenticated", { path: '/' }); 
    },

    clearUsercredentials: (state) => {
      state.UserRegisterd = false;
      localStorage.removeItem("userInfo");
    },
  },
});

export const {
  clearUsercredentials,
  setUsercredentials,
  setIsUserAuthenticated,
  clearIsUserAuthenticated,
} = userauthSlice.actions;

export default userauthSlice.reducer;
