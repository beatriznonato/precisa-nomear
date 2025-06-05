import { style } from "@vanilla-extract/css";

export const chartContainer = style({
  width: 350,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 10,
  "@media": {
    "(max-width: 1345px)": {
      width: "100%",
      flexDirection: "column",
      gap: 30,
    },
    "(max-width: 1080px)": {
      width: 370,
      flexDirection: "row",
      gap: 8,
    },
    "(max-width: 480px)": {
      width: "100%",
      flexDirection: "column",
      gap: 30,
    },
  },
});

export const chartLegend = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  "@media": {
    "(max-width: 1345px)": {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "8px 20px",
    },
    "(max-width: 1080px)": {
      display: "flex",
      flexDirection: "column",
      gap: 8,
    },
    "(max-width: 480px)": {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "8px 20px",
    },
  },
});
