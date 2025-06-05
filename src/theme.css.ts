import { createThemeContract } from "@vanilla-extract/css";
import { createTheme } from "@vanilla-extract/css";

export const themeVars = createThemeContract({
  color: {
    primary: null,
    background1: null,
    grey: null,
    lightGrey: null,
    white: null,
    black: null,
    error: null,
    graph: {
      level1: null,
      level2: null,
      level3: null,
      level4: null,
      level5: null,
    },
  },
  font: {
    family: {
      text: null,
      heading: null,
    },
    size: {
      heading: null,
      heading2: null,
      cta: null,
      text: null,
      menu: null,
      hint: null,
      button: null,
      error: null,
      mobile: {
        heading: null,
        heading2: null,
        text: null,
        button: null,
        error: null,
      },
    },
  },
});

export const themeClass = createTheme(themeVars, {
  color: {
    primary: "#8753ff",
    background1: "#f0eaff",
    grey: "#9a9a9a",
    lightGrey: "#CECECE",
    white: "#ffffff",
    black: "#1a1c1e",
    error: "#f73946",
    graph: {
      level1: "#4618b1",
      level2: "#8753ff",
      level3: "#ba9cff",
      level4: "#dac9ff",
      level5: "#efe8ff",
    },
  },
  font: {
    family: {
      text: '"Sora", sans-serif',
      heading: '"Manrope", sans-serif',
    },
    size: {
      heading: "28px",
      heading2: "20px",
      cta: "56px",
      text: "18px",
      menu: "16px",
      hint: "14px",
      button: "15px",
      error: "15px",
      mobile: {
        heading: "20px",
        heading2: "17px",
        text: "16px",
        button: "13px",
        error: "13px",
      },
    },
  },
});
