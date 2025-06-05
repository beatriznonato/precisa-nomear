import { style } from "@vanilla-extract/css";
import { themeVars } from "../../../theme.css";

export const mapContainer = style({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
  paddingTop: 30,
  "@media": {
    "(max-width: 1080px)": {
      flexDirection: "column",
      alignItems: "center",
      height: "max-content",
      overflowY: "scroll",
      selectors: {
        "&::-webkit-scrollbar": {
          display: "none",
        },
      },
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    },
  },
});

export const mapWrapper = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const mapPositioner = style({
  width: "80%",
  "@media": {
    "(max-width: 1220px)": {
      width: "90%",
    },
    "(max-width: 1080px)": {
      width: "75%",
      marginBottom: 30,
    },
  },
});

export const dashboardContainer = style({
  width: "60%",
  display: "flex",
  flexDirection: "column",
  gap: 30,
  paddingBottom: 40,
  overflowY: "scroll",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  scrollbarWidth: "none",
  msOverflowStyle: "none",

  "@media": {
    "(max-width: 1080px)": {
      width: "80%",
      minHeight: "max-content",
    },
    "(max-width: 800px)": {
      width: "100%",
    },
  },
});

export const ufBlockChart = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 5,
  padding: "24px 0 0",
  border: "1px solid",
  borderColor: themeVars.color.lightGrey,
  borderRadius: 20,
});

export const ufBlockTitleChart = style({
  fontSize: themeVars.font.size.button,
  padding: "0 29px",
  fontWeight: 400,
});
