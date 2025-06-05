import { style } from "@vanilla-extract/css";
import { themeVars } from "../../theme.css";

export const navContaniner = style({
  backgroundColor: themeVars.color.black,
  width: 217,
  color: themeVars.color.white,
  padding: 33,
  height: "100dvh",
  "@media": {
    "(max-width: 700px)": {
      position: "absolute",
      zIndex: 99,
      bottom: 0,
      display: "flex",
      width: "100%",
      height: "max-content",
      padding: 0,
    },
  },
});

export const navLogo = style({
  height: 25,
  width: "auto",
  "@media": {
    "(max-width: 700px)": {
      display: "none",
    },
  },
});

export const navSubtitle = style({
  color: themeVars.color.grey,
  "@media": {
    "(max-width: 700px)": {
      display: "none",
    },
  },
});

export const navUl = style({
  display: "flex",
  flexDirection: "column",
  gap: 30,
  padding: 0,
  listStyleType: "none",
  marginTop: 31,
  marginBottom: 50,
  "@media": {
    "(max-width: 700px)": {
      width: "100%",
      flexDirection: "row",
      margin: "20px 0",
      justifyContent: "space-around",
    },
  },
});

export const logoutContainer = style({
  display: "flex",
  gap: 13,
  backgroundColor: "transparent",
  border: "none",
  fontSize: themeVars.font.size.text,
  alignItems: "center",
  padding: 0,

  "@media": {
    "(max-width: 700px)": {
      display: "none",
    },
  },
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
