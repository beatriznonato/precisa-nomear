import { style } from "@vanilla-extract/css";
import { themeVars } from "../../theme.css";

export const formElm = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: 20,

  "@media": {
    "(max-width: 600px)": {
      gap: 14,
    },
  },
});

export const formElmBig = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: 30,

  "@media": {
    "(max-width: 600px)": {
      gap: 14,
    },
  },
});

export const formBtnWrapper = style({
  width: "100%",
  maxHeight: 152,
  display: "flex",
  justifyContent: "flex-end",
  gap: 38,
});

export const loaderContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  maxHeight: 47,
  overflow: "hidden",
});

export const fieldset = style({
  border: "none",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  gap: 20,
  padding: 0,
});

export const smallField = style({
  maxWidth: 100,
});

export const successIcon = style({
  width: 100,
  height: "auto",
  color: themeVars.color.primary,
});

export const successIconWrapper = style({
  width: 200,
  height: 200,
  borderRadius: "50%",
  backgroundColor: themeVars.color.background1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const successContainer = style({
  height: "calc(100dvh - 100px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 30,
});
