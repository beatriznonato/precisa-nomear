import { globalStyle, style } from "@vanilla-extract/css";
import { themeVars } from "../../../../theme.css";

export const barChart = style({
  fontFamily: themeVars.font.family.text,
  fontSize: 12.5,
});

globalStyle(`.${barChart} line`, {
  display: "none",
});

export const responsiveContainer = style({
  minWidth: "350px !important",
  padding: "0 0 8px",
  marginTop: "-30px !important",
});
