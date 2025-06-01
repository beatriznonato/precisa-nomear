import { style } from "@vanilla-extract/css";
import { themeVars } from "../../theme.css";

export const breakpoints = {
  md: "768px",
};

export const imageContainer = style({
  height: "100%",
  width: "50%",
  position: "relative",
  objectFit: "contain",

  "@media": {
    "(max-width: 1000px)": {
      width: "45%",
    },

    "(max-width: 800px)": {
      display: "none",
    },
  },
});

export const image = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const logo = style({
  position: "absolute",
  left: "6%",
  top: "5%",
  width: 46,
  height: "auto",
  color: themeVars.color.white,
});

export const cta = style({
  position: "absolute",
  left: "6%",
  bottom: "22%",
  color: themeVars.color.white,
  fontSize: themeVars.font.size.cta,
  maxWidth: 310,
  lineHeight: "113%",

  "@media": {
    "(max-width: 1000px)": {
      maxWidth: 260,
      fontSize: "40px",
    },
  },
});
