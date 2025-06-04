import { style } from "@vanilla-extract/css";
import { themeVars } from "../../../theme.css";

export const chartContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 10,
});

export const chartWrapper = style({
  width: 200,
  height: 200,
  position: "relative",
  backgroundColor: themeVars.color.background1,
  borderRadius: "50%",
});

export const activeDataWrapper = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  transition: "ease-in-out 0.1s",
});

export const activeDataTitle = style({
  fontSize: themeVars.font.size.heading,
  fontWeight: 600,
});

export const activeDataDesc = style({
  fontSize: themeVars.font.size.hint,
});

export const chartLegend = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const legendContainer = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

export const legenColorElm = style({
  width: 14,
  height: 14,
  borderRadius: 4,
});

export const legendDesc = style({
  fontSize: themeVars.font.size.hint,
});
