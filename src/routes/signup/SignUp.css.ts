import { style } from "@vanilla-extract/css";
import { themeVars } from "../../theme.css";

export const container = style({
  width: "100%",
  height: "100dvh",
  display: "flex",
});

export const signupArea = style({});

export const titleContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  marginBottom: 44,
});

export const formContainer = style({
  height: "100%",
  width: "50%",
  padding: "4% 8%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",

  "@media": {
    "(max-width: 1000px)": {
      width: "55%",
      padding: "5% 4%",
    },

    "(max-width: 800px)": {
      width: "100%",
      padding: "5% 20%",
    },

    "(max-width: 600px)": {
      width: "100%",
      padding: "7% 10%",
    },

    "(max-width: 450px)": {
      width: "100%",
      padding: "7% 5%",
    },
  },
});

export const formElm = style({
  display: "flex",
  flexDirection: "column",
  gap: 30,

  "@media": {
    "(max-width: 600px)": {
      gap: 14,
    },
  },
});

export const formButton = style({
  width: "100%",
});

export const textAction = style({
  width: "100%",
  textAlign: "center",
  marginTop: 20,
});

export const loginError = style({
  color: themeVars.color.error,
});

export const logo = style({
  width: "auto",
  marginRight: "auto",
  marginBottom: 20,
  minHeight: 40,
  color: themeVars.color.primary,
  "@media": {
    "(min-width: 800px)": {
      opacity: 0,
    },
  },
});

export const loaderContainer = style({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});
