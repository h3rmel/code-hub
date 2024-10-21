import { SystemStyleObject } from "@chakra-ui/react";

export const sxLayoutBox: SystemStyleObject = {
  display: "flex",
  flexDirection: "column",
  w: "100%",
  h: "100vh",
};

export const sxLayoutNavbarStack: SystemStyleObject = {
  px: 8,
  py: 4,
  boxShadow: "md",
};

export const sxLayoutNavbarContainer: SystemStyleObject = {
  maxW: "container.sm",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
