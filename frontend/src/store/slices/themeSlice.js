import { createSlice } from "@reduxjs/toolkit";


const rootTheme = {
  light: {
    name:"light",
    primary: "#2D5BFF",
    secondary: "#FF6B35",
    accent: "#00E676",

    background: "#F5F7FA",
    cardBackground: "#FFFFFF",

    textPrimary: "#1A1A1A",
    textSecondary: "#666666",

    border: "#E0E0E0"
  },
  dark: {
    name:"dark",
    primary: "#4A7CFF",
    secondary: "#FF8A50",
    accent: "#00FF88",

    background: "#121212",
    cardBackground: "#1E1E1E",

    textPrimary: "#FFFFFF",
    textSecondary: "#A0A0A0",

    border: "#333333"
  },

  currentTheme: {
    primary: "#2D5BFF",
    secondary: "#FF6B35",
    accent: "#00E676",

    background: "#F5F7FA",
    cardBackground: "#FFFFFF",

    textPrimary: "#1A1A1A",
    textSecondary: "#666666",

    border: "#E0E0E0"
  },
  // currentTheme: {
  //   primary: "#4A7CFF",
  //   secondary: "#FF8A50",
  //   accent: "#00FF88",

  //   background: "#121212",
  //   cardBackground: "#1E1E1E",

  //   textPrimary: "#FFFFFF",
  //   textSecondary: "#A0A0A0",

  //   border: "#333333"
  // }
}


const slice = createSlice({
  name: "theme",
  initialState: rootTheme,
  reducers: {
    toggleTheme: (state, action) => {
      if (state === "light") {
        rootTheme.currentTheme = rootTheme.dark;
        return
      } else {
        rootTheme.currentTheme = rootTheme.light;
        return
      }
      // state == "light" ? rootTheme.currentTheme=rootTheme.dark : rootTheme.currentTheme=rootTheme.light;
    },
  },
});

export const { toggleTheme } = slice.actions;
export default slice.reducer;
