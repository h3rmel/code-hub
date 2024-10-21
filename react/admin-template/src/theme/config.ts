import { ToastProviderProps, extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: true,
  colors: {
    primary: {
      50: "#95aabf",
      100: "#8098b2",
      200: "#6b87a5",
      300: "#557698",
      400: "#40658b",
      500: "#2b547e",
      600: "#274c71",
      700: "#224365",
      800: "#1e3b58",
      900: "#1a324c",
      950: "#162a3f",
    },
    accent: {
      50: "#e39494",
      100: "#dd7e7e",
      200: "#d76969",
      300: "#d15353",
      400: "#cc3e3e",
      500: "#c62828",
      600: "#b22424",
      700: "#9e2020",
      800: "#8b1c1c",
      900: "#771818",
      950: "#631414",
    },
    light: {
      50: "#f6f7f8",
      100: "#f4f5f7",
      200: "#f2f4f5",
      300: "#f0f2f4",
      400: "#eef1f2",
      500: "#eceff1",
      600: "#d4d7d9",
      700: "#bdbfc1",
      800: "#a5a7a9",
      900: "#8e8f91",
      950: "#767879",
    },
    dark: {
      50: "#8e989d",
      100: "#778389",
      200: "#606f75",
      300: "#495a61",
      400: "#33464e",
      500: "#1c313a",
      600: "#192c34",
      700: "#16272e",
      800: "#142229",
      900: "#111d23",
      950: "#0e191d",
    },
  },
  sizes: {
    container: "min(100% - 2rem, 75rem)",
  },
});

export const toastConfig: ToastProviderProps = {
  defaultOptions: {
    position: "top",
    duration: 3000,
    isClosable: true,
  },
};
