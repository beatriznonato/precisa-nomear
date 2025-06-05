import { style } from "@vanilla-extract/css";
import { themeVars } from "../../../theme.css";

export const container = style({
  display: "flex",
  height: "100dvh",
});

export const contentWrapper = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "32px 27px",
  "@media": {
    "(max-width: 700px)": {
      justifyContent: "space-between",
    },
  },
});

export const tabsNavigation = style({
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  padding: 0,
  gap: 49,

  "@media": {
    "(max-width: 420px)": {
      gap: 30,
    },
  },
});

export const clearBtn = style({
  background: "transparent",
  border: "none",
  padding: 0,
  fontSize: themeVars.font.size.menu,
  color: themeVars.color.black,
  paddingBottom: 4,
});

export const tabsItem = style({
  listStyleType: "none",
  paddingBottom: 5,
  transition: "ease-in-out 0.1s",
});

export const selectedStyles = {
  color: themeVars.color.primary,
  borderColor: themeVars.color.primary,
  borderBottom: "2px solid",
};

export const settingTabForm = style({
  width: "100%",
  height: "100%",
  maxWidth: 800,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  overflow: "scroll",
  // Hide scrollbar in WebKit browsers (Chrome, Safari)
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  // Hide scrollbar in Firefox
  scrollbarWidth: "none",
  // Hide scrollbar in IE/Edge (legacy)
  msOverflowStyle: "none",
});

export const profileSummary = style({
  display: "flex",
  alignItems: "center",
  gap: 22,
});

export const profileImg = style({
  width: 79,
  height: 79,
});

export const summaryName = style({
  fontSize: themeVars.font.size.text,
  marginBottom: 5,
});

export const summaryCpf = style({
  fontSize: themeVars.font.size.hint,
  color: themeVars.color.grey,
});

export const settingTabTitle = style({
  marginBottom: 18,
});

export const settingsBtn = style({
  width: "max-content",
});

export const fieldsWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

export const goBack = style({
  display: "flex",
  alignItems: "center",
  gap: 15,
});

export const goBackIcon = style({
  height: 25,
  marginTop: 2,
  cursor: "pointer",
  "@media": {
    "(min-width: 700px)": {
      display: "none",
    },
  },
});
