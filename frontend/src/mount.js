import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const divClass = "luna-skill-calc";

function mount(el, props = {}) {
  const root = createRoot(el);
  root.render(React.createElement(App, props));
}

// Auto-mounting logic
function autoMount() {
  const divLoc = document.getElementById(divClass);

  if (!divLoc) {
    console.warn(
      `[LunaSkillCalc] No element found with id="#${divClass}"`
    );
    return;
  }

  // Prevent double-mount
  if (divLoc.__SKILL_CALC_MOUNTED__) return;
  divLoc.__SKILL_CALC_MOUNTED__ = true;

  mount(divLoc);
}

// Run immediately if DOM is ready
if (document.readyState === "complete" || document.readyState === "interactive") {
  autoMount();
} else {
  document.addEventListener("DOMContentLoaded", autoMount);
}
