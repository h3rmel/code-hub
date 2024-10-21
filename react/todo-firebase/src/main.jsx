import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import router from "./router/Index";

import "./styles/style.css";

const app = createRoot(document.getElementById("app"));

app.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
