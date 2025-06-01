import { style } from "@vanilla-extract/css";
import { themeVars } from "../../theme.css";

export const container = style({
  width: "100%",
  height: "100dvh",
  display: "flex",
});

export const titleContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  marginBottom: 44,
});

export const formContainer = style({
  height: "100%",
  width: "50%",
  padding: "0 8%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  position: "relative",

  "@media": {
    "(max-width: 1000px)": {
      width: "55%",
      padding: "0 4%",
    },

    "(max-width: 800px)": {
      width: "100%",
      padding: "0 20%",
    },

    "(max-width: 600px)": {
      width: "100%",
      padding: "0 10%",
    },

    "(max-width: 450px)": {
      width: "100%",
      padding: "0 5%",
    },
  },
});

export const formElm = style({
  display: "flex",
  flexDirection: "column",
  gap: 38,

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
  position: "absolute",
  bottom: "4%",
  left: "50%",
  transform: "translateX(-50%)",

  "@media": {
    "(max-width: 450px)": {
      width: "80%",
      padding: "0 5%",
    },
  },
});

export const loginError = style({
  color: themeVars.color.error,
});

export const logo = style({
  position: "absolute",
  left: "6%",
  top: "5%",
  width: 40,
  height: "auto",
  color: themeVars.color.primary,
  "@media": {
    "(min-width: 800px)": {
      display: "none",
    },
  },
});
