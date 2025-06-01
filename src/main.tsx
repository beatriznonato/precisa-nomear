import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { themeClass } from "./theme.css";
import "./global.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className={themeClass}>
      <App />
    </div>
  </StrictMode>
);
