import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showSideBar: false,
};

export const drawerSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setShowSidebar: (state) => {
      state.showSideBar = !state.showSideBar;
    },
  },
});

export const { setShowSidebar } = drawerSlice.actions;
