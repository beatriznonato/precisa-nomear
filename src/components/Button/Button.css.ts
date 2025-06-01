import { style } from "@vanilla-extract/css";
import { themeVars } from "../../theme.css";

export const button = style({
  padding: "12px 24px",
  borderRadius: 10,
  transition: "ease-in-out 0.1s",
  border: "solid 2px",
  selectors: {
    "&:disabled, &:disabled:hover": {
      backgroundColor: themeVars.color.background1,
      borderColor: themeVars.color.background1,
      color: themeVars.color.black,
      opacity: 0.6,
    },
  },
});

export const buttonDefault = style({
  borderColor: themeVars.color.primary,
  backgroundColor: themeVars.color.primary,
  color: themeVars.color.white,
  selectors: {
    "&:hover": {
      borderColor: themeVars.color.primary,
      backgroundColor: themeVars.color.white,
      color: themeVars.color.primary,
    },
  },
});

export const buttonTransparent = style({
  borderColor: themeVars.color.white,
  backgroundColor: themeVars.color.white,
  color: themeVars.color.black,
  selectors: {
    "&:hover": {
      borderColor: themeVars.color.background1,
      backgroundColor: themeVars.color.background1,
    },
  },
});

export const buttonCircle = style({
  borderColor: themeVars.color.primary,
  backgroundColor: themeVars.color.primary,
  color: themeVars.color.white,
  width: 40,
  height: 40,
  padding: 0,
  borderRadius: "50%",
  fontSize: themeVars.font.size.hint,
  "@media": {
    "(max-width: 600px)": {
      width: 30,
      height: 30,
    },
  },
});

export const buttonWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
});

export const buttonText = style({
  fontWeight: 600,
  fontSize: themeVars.font.size.button,
  textTransform: "uppercase",
  color: "inherit",

  "@media": {
    "(max-width: 600px)": {
      fontSize: 13,
    },
  },
});

export const buttonIcon = style({
  height: 19,
});
