import { globalStyle, style } from "@vanilla-extract/css";

export const mapSvg = style({
  width: "100%",
  height: "auto",
});

globalStyle(`.${mapSvg} > path`, {
  cursor: "pointer",
});
