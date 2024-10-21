import { createRoot } from "react-dom/client";

import "@fontsource/sora";
import "@fontsource/space-grotesk";

import { theme } from "@/config/theme";
import { ChakraProvider } from "@chakra-ui/react";

import { router } from "@/router/Index";
import { RouterProvider } from "react-router-dom";

const app = createRoot(document.getElementById("app"));

app.render(
  <ChakraProvider theme={theme}>
    <RouterProvider router={router} />
  </ChakraProvider>
);
