import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

// Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then(registration => {
        console.log("Service worker registered:", registration);
      })
      .catch(error => {
        console.error("Service worker registration failed:", error);
      });
  });
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
