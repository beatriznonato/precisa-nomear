import { globalStyle, style } from "@vanilla-extract/css";
import { themeVars } from "../../../theme.css";

export const alignCenter = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const container = style({
  display: "flex",
  height: "100dvh",
});

export const contentWrapper = style({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "32px 27px",
  "@media": {
    "(max-width: 700px)": {
      justifyContent: "space-between",
    },
  },
});

export const header = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  minHeight: 45,
});

export const userNav = style({
  "@media": {
    "(max-width: 700px)": {
      display: "none",
    },
  },
});

export const upperNav = style({
  display: "flex",
  alignItems: "center",
  gap: 16,
});

export const headerTextWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: 3,
});

globalStyle(`${headerTextWrapper} > h3`, {
  fontSize: themeVars.font.size.mobile.heading2,
});

globalStyle(`${headerTextWrapper} > p`, {
  fontSize: themeVars.font.size.mobile.text,
  fontWeight: 300,
});

export const settingsIcon = style({
  width: 34,
  height: "auto",
  cursor: "pointer",
});

globalStyle(`${settingsIcon} > path`, {
  strokeWidth: 1.5,
});

export const profilePhoto = style({
  width: 34,
  height: 34,
  borderRadius: "50%",
  overflow: "hidden",
});

export const weatherIcon = style({
  maxWidth: 400,
  marginBottom: 22,
  marginTop: 50,
  "@media": {
    "(max-width: 700px)": {
      maxWidth: 300,
      height: "auto",
      marginBottom: 22,
    },
  },
});

export const temperature = style({
  fontSize: 50,
  fontWeight: 400,
  "@media": {
    "(min-width: 700px)": {
      fontSize: 60,
    },
  },
});

export const userLocation = style({
  fontSize: themeVars.font.size.text,
  fontWeight: 300,
  "@media": {
    "(min-width: 700px)": {
      fontSize: 23,
    },
  },
});

export const weatherDetails = style({
  display: "flex",
  gap: 37,
  height: 57,
  marginTop: 50,
});

export const separator = style({
  height: "100%",
  width: 1,
  backgroundColor: themeVars.color.lightGrey,
  borderRadius: 1,
});

export const weatherItem = style({
  textAlign: "center",
});

globalStyle(`${weatherItem} > h4`, {
  fontSize: themeVars.font.size.hint,
  textTransform: "uppercase",
  fontWeight: 400,
  marginBottom: 5,
});

globalStyle(`${weatherItem} > p`, {
  fontSize: 24,
  fontWeight: 300,
});

export const alertPlaceholder = style({
  height: "20%",
});
