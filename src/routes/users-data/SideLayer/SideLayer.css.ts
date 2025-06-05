import { globalStyle, style } from "@vanilla-extract/css";
import { themeVars } from "../../../theme.css";

export const profilePhoto = style({
  maxWidth: 222,
  width: "100%",
  minHeight: 222,
  borderRadius: 20,
  overflow: "hidden",
  margin: "0 auto",
});

export const userName = style({
  textAlign: "center",
});

export const infoBox = style({
  display: "flex",
  flexDirection: "column",
  gap: 5,
  fontSize: themeVars.font.size.text,
});

globalStyle(`.${infoBox} > h4`, {
  marginBottom: 4,
});

globalStyle(`.${infoBox} > p`, {
  fontWeight: 300,
});

export const cardWrapper = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 10,
});
