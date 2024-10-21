import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import { customTheme, toastConfig } from "@/theme/config";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme} toastOptions={toastConfig}>
      <main className={`${inter.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}
