import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import "./index.css";
createRoot(document.getElementById("root")).render(React.createElement(StrictMode, null,
    React.createElement(App, null)));
