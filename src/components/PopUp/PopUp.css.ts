import { style } from "@vanilla-extract/css";
import { themeVars } from "../../theme.css";

export const popupDialog = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  border: "none",
  borderRadius: 8,
  gap: 20,
  padding: 30,
  maxWidth: 300,
});

export const iconWrapper = style({
  width: 104,
  height: 104,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: themeVars.color.background1,
  borderRadius: "50%",
});

export const popupIcon = style({
  width: 40,
  height: "auto",
  color: themeVars.color.primary,
});

export const popupHeadline = style({
  fontWeight: 600,
  textAlign: "center",
});

export const popupSubline = style({
  textAlign: "center",
});

export const btnWrapper = style({
  display: "flex",
  gap: 12,
});

export const popupBtn = style({
  padding: "10px 18px",
});
