import { globalStyle } from "@vanilla-extract/css";
import { themeClass, themeVars } from "./theme.css";

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("html, body", {
  margin: 0,
  padding: 0,
});

globalStyle(`.${themeClass}`, {
  backgroundColor: themeVars.color.white,
  height: "100%",
  overflow: "hidden",
});

globalStyle("p, span, label, input", {
  fontFamily: themeVars.font.family.text,
  color: themeVars.color.black,
  fontWeight: 400,
  fontStyle: "normal",
  margin: 0,
});

globalStyle("h1, h2, h3, h4, h5, h6", {
  fontFamily: themeVars.font.family.heading,
  color: themeVars.color.black,
  margin: 0,
});

/* Chrome, Safari, Edge, Opera */
globalStyle(
  "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button",
  {
    WebkitAppearance: "none",
    margin: 0,
  }
);

/* Firefox */
globalStyle('input[type="number"]', {
  MozAppearance: "textfield",
});
