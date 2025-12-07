import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "theme",
  initialState: "light",
  reducers: {
    toggleTheme: (state, action) => {
      if (state === "light") {
        return "dark";
      } else {
        return "light";
      }
    },
  },
});

export const { toggleTheme } = slice.actions;
export default slice.reducer;
