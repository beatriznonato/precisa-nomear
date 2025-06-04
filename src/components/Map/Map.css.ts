import { style } from "@vanilla-extract/css";
import { themeVars } from "../../theme.css";

export const mapWrapper = style({
  position: "relative",
});

export const tooltip = style({
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: themeVars.color.white,
  backgroundColor: themeVars.color.black,
  padding: 18,
  borderRadius: 18,
  fontSize: themeVars.font.size.button,
  pointerEvents: "none",
  zIndex: 9,
});

export const tooltipUF = style({
  color: themeVars.color.white,
  fontWeight: 500,
});

export const tooltipUFCount = style({
  fontFamily: themeVars.font.family.text,
  fontWeight: 300,
});

export const statePath = style({
  transition: "fill 0.2s ease",
  selectors: {
    "&:hover": {
      fill: themeVars.color.primary,
    },
  },
});

export const sideLayer = style({
  position: "fixed",
  top: 0,
  width: 527,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  backgroundColor: themeVars.color.white,
  borderLeft: "1px solid",
  borderColor: themeVars.color.lightGrey,
  padding: "31px 55px",
  zIndex: 10,
  gap: 30,
  transition: "right 0.5s ease-in-out",
  "@media": {
    "(max-width: 743px)": {
      width: "100%",
    },
    "(max-width: 600px)": {
      padding: "31px 30px",
    },
    "(max-width: 480px)": {
      padding: "31px 20px",
    },
  },
});

export const sideLayerAlert = style({
  position: "unset",
  "@media": {
    "(min-width: 700px)": {
      position: "unset",
      maxWidth: "none",
    },
  },
});

export const returnBtn = style({
  padding: 0,
  border: "none",
  selectors: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
});

export const ufName = style({
  margin: "",
});

export const stateData = style({
  width: "100%",
  height: "max-content",
  display: "flex",
  flexDirection: "column",
  gap: 30,
  overflowY: "scroll",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  scrollbarWidth: "none",
  msOverflowStyle: "none",
});

export const ufDataGrid = style({
  width: "100%",
  display: "flex",
  gap: 30,
});

export const ufBlock = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 5,
  padding: "24px 29px",
  border: "1px solid",
  borderColor: themeVars.color.lightGrey,
  borderRadius: 20,
});

export const ufBlockTitle = style({
  fontSize: themeVars.font.size.button,
  fontWeight: 400,
});

export const ufBlockCount = style({
  fontFamily: themeVars.font.family.text,
  fontSize: themeVars.font.size.heading,
  fontWeight: 500,
});
