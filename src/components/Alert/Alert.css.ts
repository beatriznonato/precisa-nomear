import { style } from "@vanilla-extract/css";
import { themeVars } from "../../theme.css";

export const alertContainer = style({
  display: "flex",
  width: "100%",
  padding: 17,
  flexDirection: "column",
  gap: 5,
  border: "1px solid",
  borderColor: themeVars.color.primary,
  backgroundColor: themeVars.color.white,
  borderRadius: 10,
  "@media": {
    "(min-width: 700px)": {
      maxWidth: 300,
      position: "absolute",
      top: "120px",
      right: "30px",
    },
  },
});

export const alertHeader = style({
  display: "flex",
  gap: 8,
});

export const alertIcon = style({
  width: 15,
  height: "auto",
  color: themeVars.color.primary,
});

export const alertTitle = style({
  fontSize: themeVars.font.size.mobile.text,
  fontWeight: 600,
});

export const alertContent = style({
  fontSize: themeVars.font.size.mobile.text,
  fontWeight: 300,
});

export const alertValidity = style({
  fontSize: 13,
  fontWeight: 300,
  color: themeVars.color.grey,
});

