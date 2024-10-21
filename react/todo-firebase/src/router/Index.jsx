import { createBrowserRouter } from "react-router-dom";

import { Admin, Error, Home, NotFound, Register } from "@/pages/Index";

import Protected from "./Protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
  {
    path: "/admin",
    element: <Protected children={<Admin />} />,
    errorElement: <Error />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
