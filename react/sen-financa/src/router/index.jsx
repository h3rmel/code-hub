//#region Imports

import { createBrowserRouter } from "react-router-dom";

import { About, Error, Home, NotFound } from "@/pages/Index";

//#endregion

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <Error />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
