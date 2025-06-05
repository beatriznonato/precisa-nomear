import { style } from "@vanilla-extract/css";
import { themeVars } from "../../../theme.css";

export const container = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 6,
});

export const fieldLabel = style({});

export const inputWrapper = style({
  display: "flex",
  marginTop: 3,
});

export const inputField = style({
  width: "100%",
  border: `1px solid ${themeVars.color.grey}`,
  backgroundColor: themeVars.color.white,
  fontSize: themeVars.font.size.mobile.text,
  gap: 10,
  borderRadius: 9,
  padding: "10px 12px !important",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
  selectors: {
    "&:focus": {
      outline: "none",
    },
  },
});

export const inputIcon = style({
  color: themeVars.color.grey,
});

export const fieldError = style({
  fontSize: themeVars.font.size.error,
  color: themeVars.color.grey,
});
