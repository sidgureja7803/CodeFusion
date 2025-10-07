import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./output.css";
import "./input.css";
import "./styles/theme-variables.css"; // Add LeetCode-like theme variables
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
