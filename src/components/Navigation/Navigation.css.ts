import { style } from "@vanilla-extract/css";
import { themeVars } from "../../theme.css";

export const navContaniner = style({
  backgroundColor: themeVars.color.black,
  width: 217,
  color: themeVars.color.white,
  padding: 33,
  height: "100dvh",
});

export const navLogo = style({
  height: 25,
  width: "auto",
});

export const navSubtitle = style({
  color: themeVars.color.grey,
});

export const navUl = style({
  display: "flex",
  flexDirection: "column",
  gap: 30,
  padding: 0,
  listStyleType: "none",
  marginTop: 31,
  marginBottom: 50,
});

export const logoutContainer = style({
  display: "flex",
  gap: 13,
  backgroundColor: "transparent",
  border: "none",
  fontSize: themeVars.font.size.text,
  alignItems: "center",
  padding: 0,
});

export const logoutIcon = style({
  color: themeVars.color.white,
  width: "auto",
  height: 17,
  transition: "ease-in-out 0.1s",
  selectors: {
    [`${logoutContainer}:hover &`]: {
      color: themeVars.color.primary,
    },
  },
});

export const logoutText = style({
  color: themeVars.color.white,
  transition: "ease-in-out 0.1s",
  selectors: {
    [`${logoutContainer}:hover &`]: {
      color: themeVars.color.primary,
    },
  },
});
