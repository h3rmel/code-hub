import { SystemStyleObject } from "@chakra-ui/react";

export const sxAuthPage: SystemStyleObject = {
  flexDirection: { base: "column", xl: "row" },
  w: "100%",
  h: "100vh",
};

export const sxAuthLogin: SystemStyleObject = {
  w: { base: "100%", xl: "40%" },
  h: "100vh",
};

export const sxAuthBanner: SystemStyleObject = {
  w: "60%",
  h: "100vh",
  display: { base: "none", xl: "flex" },
  backgroundImage: "/prism-login.png",
  borderLeft: "1px solid rgba(0, 0, 0, 0.2)",
};

export const sxToggleColorMode: SystemStyleObject = {
  pos: "absolute",
  top: "1rem",
  left: "1rem",
};
