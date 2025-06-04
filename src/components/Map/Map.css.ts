import { style } from "@vanilla-extract/css";
import { themeVars } from "../../theme.css";

export const mapWrapper = style({
  position: "relative",
});

export const tooltip = style({
  position: "fixed",
  backgroundColor: themeVars.color.black,
  color: themeVars.color.white,
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "12px",
  pointerEvents: "none",
  zIndex: 9,
});

export const tooltipUF = style({
  color: themeVars.color.white,
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
  right: 0,
  top: 0,
  width: "300px",
  height: "100%",
  backgroundColor: "#fff",
  boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
  padding: "16px",
  zIndex: 999,
});
