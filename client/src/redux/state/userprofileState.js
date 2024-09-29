import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userdata: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  userAvatarprops: {
    backgroundColor: localStorage.getItem("avatarbgColor")
      ? localStorage.getItem("avatarbgColor")
      : "#ffff00",
  },
};

export const userprofileSlice = createSlice({
  name: "userprofileinfo",
  initialState,
  reducers: {
    setUserdata: (state, action) => {
      if (state.userdata) {
        state.userdata.fullname = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(state.userdata));
      }
    },
    setUserAvatarprops: (state, action) => {
      state.userAvatarprops.backgroundColor = action.payload;
      localStorage.setItem("avatarbgColor", action.payload);
    },
  },
});

export const { setUserdata, setUserAvatarprops } = userprofileSlice.actions;
