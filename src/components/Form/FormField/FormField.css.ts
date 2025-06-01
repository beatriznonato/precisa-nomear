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
  border: `1px solid ${themeVars.color.grey}`,
  gap: 10,
  borderRadius: 9,
  padding: "10px 12px",
  marginTop: 3,
});

export const inputField = style({
  width: "100%",
  border: "none",
  selectors: {
    "&::placeholder": {
      color: themeVars.color.grey,
    },
    "&:focus": {
      border: "none",
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
