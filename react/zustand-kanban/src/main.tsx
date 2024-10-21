//#region Imports

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";

import "@/styles/main.css";

//#endregion

const app = createRoot(document.getElementById("app")!);

app.render(
  <StrictMode>
    <App />
  </StrictMode>
);
