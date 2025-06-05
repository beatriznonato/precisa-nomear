import { style } from "@vanilla-extract/css";
import { themeVars } from "../../theme.css";

export const container = style({
  display: "flex",
  gap: 13,
  color: themeVars.color.white,
});

export const linkIcon = style({
  width: "auto",
  height: 17,
  transition: "ease-in-out 0.1s",
  selectors: {
    [`${container}:hover &`]: {
      color: themeVars.color.primary,
    },
  },
  "@media": {
    "(max-width: 700px)": {
      height: 30,
    },
  },
});

export const linkText = style({
  transition: "ease-in-out 0.1s",
  color: themeVars.color.white,
  selectors: {
    [`${container}:hover &`]: {
      color: themeVars.color.primary,
    },
  },
  "@media": {
    "(max-width: 700px)": {
      display: "none",
    },
  },
});
