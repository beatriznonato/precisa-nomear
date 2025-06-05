import { style } from "@vanilla-extract/css";
import { themeVars } from "../../../theme.css";

export const miniCard = style({
  display: "flex",
  gap: 11,
});

export const iconContainer = style({
  display: "flex",
  width: 41,
  height: 41,
  padding: 5,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  border: "1px solid",
  borderColor: themeVars.color.lightGrey,
  color: themeVars.color.primary,
});

export const cardText = style({});

export const cardLabel = style({
  fontSize: themeVars.font.size.mobile.button,
  color: themeVars.color.grey,
  fontWeight: 300,
});

export const cardValue = style({});
