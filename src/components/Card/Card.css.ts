import { style } from "@vanilla-extract/css";
import { themeVars } from "../../theme.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  border: "2px solid",
  borderColor: themeVars.color.background1,
  backgroundColor: themeVars.color.white,
  borderRadius: 18,
  width: 218,
  height: 133,
  transition: "ease-in-out 0.1s",
  cursor: "pointer",
  selectors: {
    "&:hover": {
      backgroundColor: "#FCFBFF",
    },
  },
});

export const iconWrapper = style({
  width: 55,
  height: 55,
  borderRadius: "50%",
  color: themeVars.color.primary,
  backgroundColor: themeVars.color.background1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const selected = style({
  border: "3px solid",
  borderColor: themeVars.color.primary,
});
