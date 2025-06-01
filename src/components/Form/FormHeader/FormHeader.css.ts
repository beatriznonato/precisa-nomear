import { style } from "@vanilla-extract/css";
import { themeVars } from "../../../theme.css";

export const container = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

export const heading = style({
  fontSize: themeVars.font.size.heading,
});
