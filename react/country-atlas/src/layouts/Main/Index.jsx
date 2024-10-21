import { useEffect } from "react";

import { Header } from "../Header/Index";

import { Box, useColorModeValue } from "@chakra-ui/react";

import { appSx, boxSx } from "./style";

export const MainLayout = ({ children, pageTitle }) => {
  const color = useColorModeValue("gray.800", "gray.200");
  const bg = useColorModeValue("gray.100", "gray.800");

  useEffect(() => {
    document.title = `${pageTitle} | Country Atlas`;
  }, []);

  return (
    <Box sx={appSx} bg={bg} color={color}>
      <Header />
      <Box sx={boxSx}>{children}</Box>
    </Box>
  );
};
