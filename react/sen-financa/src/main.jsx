//#region Imports

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { router } from "./router";

import { AppProvider } from "./contexts/app";

//#endregion

import "@/styles/main.css";

const app = createRoot(document.getElementById("app"));

app.render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);
