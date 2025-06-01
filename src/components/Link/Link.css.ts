import { style } from "@vanilla-extract/css";
import { themeVars } from "../../theme.css";

export const link = style({
  color: themeVars.color.primary,
  fontWeight: 600,
  textDecoration: "none",
  transition: 'ease-in-out 0.1s',
  selectors: {
    "&:hover": {
      color: themeVars.color.graph.level3,
    },
  },
});
