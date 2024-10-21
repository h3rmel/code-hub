//#region Imports

import { useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { Navbar } from "@/components/Index";

import { Box, useColorModeValue } from "@chakra-ui/react";

import {
  sxLayoutBox,
  sxLayoutNavbarStack,
  sxLayoutNavbarContainer,
} from "@/styles/mainLayout";

import { initFirebase } from "@/firebase/firebaseApp";

import { getAuth } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

//#endregion

export function MainLayout({ title, children }: MainLayoutProps) {
  const color = useColorModeValue("dark.500", "light.500");
  const bgColor = useColorModeValue("light.500", "dark.500");

  const router = useRouter();

  //* Authentication Persistency
  initFirebase();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  
  useEffect(() => {
    if (!user) router.push("/authentication");
  });

  return (
    <>
      <Head>
        <title>{title} | Admin Template</title>
      </Head>
      <Box sx={sxLayoutBox} color={color} bgColor={bgColor}>
        <Navbar
          sxStack={sxLayoutNavbarStack}
          sxContainer={sxLayoutNavbarContainer}
          userInfo={user}
        />
        <Box p={8}>{children}</Box>
      </Box>
    </>
  );
}
