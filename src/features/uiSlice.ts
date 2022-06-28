import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isWindowAtTop: true,
};

export const uiSlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    toggleIsWindowAtTop: (state, action) => {
      state.isWindowAtTop = action.payload;
    },
    setIsWindowAtTop: (state, action) => {
      state.isWindowAtTop = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
