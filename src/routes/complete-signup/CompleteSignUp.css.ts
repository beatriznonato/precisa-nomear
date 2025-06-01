import { style } from "@vanilla-extract/css";
import { themeVars } from "../../theme.css";

export const header = style({
  position: "absolute",
  padding: "50px 40px",
});

export const logo = style({
  width: "auto",
  minHeight: 41,
});

export const container = style({
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "0 10%",

  "@media": {
    "(max-width: 600px)": {
      padding: "0 5.5%",
    },
  },
});

export const formNavigation = style({
  width: "100%",
  position: "relative",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  justifyContent: "space-between",
  marginTop: 35,
  marginBottom: 40,
});

export const upcomingNavButton = style({
  borderColor: themeVars.color.background1,
  backgroundColor: themeVars.color.white,
  color: themeVars.color.black,
});

export const navButton = style({
  position: "relative",
  zIndex: 3,
});

export const progress = style({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: "100%",
  borderRadius: 3,
  height: 3,
  backgroundColor: themeVars.color.background1,
});

export const currentProgress = style({
  height: "100%",
  backgroundColor: themeVars.color.primary,
  borderRadius: 3,
  transition: "width 0.3s ease",
});

export const formElm = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: 38,

  "@media": {
    "(max-width: 600px)": {
      gap: 14,
    },
  },
});

export const cardWrapper = style({
  border: "none",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  gap: 67,
  padding: 0,
  marginTop: 40,

  "@media": {
    "(max-width: 850px)": {
      gap: 30,
    },

    "(max-width: 500px)": {
      flexDirection: "column",
      alignItems: "center",
      gap: 20,
    },
  },
});

export const card = style({
  "@media": {
    "(max-width: 850px)": {
      width: "100% !important",
      maxWidth: "150px",
    },

    "(max-width: 500px)": {
      maxWidth: "none",
    },
  },
});

export const formButton = style({
  width: "max-content",
});
