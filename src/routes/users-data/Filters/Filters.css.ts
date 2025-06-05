import { style } from "@vanilla-extract/css";
import { themeVars } from "../../../theme.css";

export const filterContainer = style({
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
  margin: "20px 0",
  gap: 10,
});

export const selectWrapper = style({
  display: "flex",
  alignItems: "center",
  color: themeVars.color.primary,
  gap: 5,
});

export const selectPlaceholder = style({
  textTransform: "uppercase",
  fontWeight: 500,
  color: themeVars.color.primary,
  fontSize: themeVars.font.size.hint,
});

export const filterIcon = style({
  width: 15,
});

export const select = style({
  zIndex: 9,
});
