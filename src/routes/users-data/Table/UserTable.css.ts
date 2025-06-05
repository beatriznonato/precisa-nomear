import { style } from "@vanilla-extract/css";
import { themeVars } from "../../../theme.css";

export const table = style({
  width: "100%",
  borderCollapse: "collapse",
  tableLayout: "fixed",
});

export const tableHead = style({
  position: "sticky",
  top: 0,
  backgroundColor: themeVars.color.white,
  zIndex: 1,
});

export const headItem = style({
  textAlign: "start",
  color: themeVars.color.grey,
  textTransform: "uppercase",
  fontSize: themeVars.font.size.button,
  fontFamily: themeVars.font.family.text,
  fontWeight: 500,
  padding: "10px 0px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",
  paddingRight: 5,
});

export const tableBody = style({
  height: "max-content",
});

export const tableItemGroup = style({
  color: themeVars.color.black,
  fontSize: themeVars.font.size.text,
  fontFamily: themeVars.font.family.text,
  cursor: "pointer",
  padding: "18px 0",
  gap: 5,
});

export const tableItem = style({
  padding: "18px 5px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",
  fontWeight: 300,
});
