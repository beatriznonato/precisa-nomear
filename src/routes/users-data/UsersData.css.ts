import { style } from "@vanilla-extract/css";

export const tableWrapper = style({
  width: "100%",
  height: "100%",
  overflowY: "scroll",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  scrollbarWidth: "none",
  msOverflowStyle: "none",
});
