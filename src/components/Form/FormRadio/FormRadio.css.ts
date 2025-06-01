import { style } from "@vanilla-extract/css";
import { themeVars } from "../../../theme.css";

export const container = style({
  width: "100%",
});

export const radioLabel = style({
  marginBottom: 10,
});

export const radioContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

export const radioWrapper = style({
  display: "flex",
  gap: 10,
});

export const radioInput = style({
  appearance: "none",
  width: "20px",
  height: "20px",
  border: "1px solid",
  borderColor: themeVars.color.primary,
  borderRadius: 5,
  cursor: "pointer",
  backgroundColor: themeVars.color.white,
  transition: "ease-in-out 0.1s",

  selectors: {
    "&:checked": {
      backgroundColor: themeVars.color.primary,
    },
  },
});

export const radioError = style({});
