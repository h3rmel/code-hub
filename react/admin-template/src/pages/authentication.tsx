//#region Imports

import { ChangeEvent, useEffect, useState } from "react";

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import {
  Card,
  CardBody,
  Center,
  Flex,
  useColorModeValue,
  Heading,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Divider,
  CardFooter,
  HStack,
  useToast,
} from "@chakra-ui/react";

import { GoogleLogo } from "@phosphor-icons/react";

import {
  InputPassword,
  AuthModeToggle,
  ToggleColorMode,
} from "@/components/Index";

import {
  sxAuthPage,
  sxAuthLogin,
  sxAuthBanner,
  sxToggleColorMode,
} from "@/styles/authentication";

import { initFirebase } from "@/firebase/firebaseApp";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

import { handleErrorCode } from "@/services/handleError";

//#endregion

export default function Authentication() {
  const [mode, setMode] = useState<Mode>("login");
  const [user, setUser] = useState<User>({});

  const router = useRouter();

  const color = useColorModeValue("light.500", "dark.500");
  const toast = useToast();

  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  
  //* Authentication
  initFirebase();
  const auth = getAuth();
  const [userAuth] = useAuthState(auth);

  useEffect(() => {
    if (userAuth) router.push("/");
  }, [userAuth, router]);

  //* Google
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      toast({
        title: "Logado com sucesso!",
        status: "success",
      });
    } catch (error: any) {
      toast({
        title: "Erro!",
        description: `Um erro ocorreu! Informações: ${handleErrorCode(
          error.code
        )}`,
        status: "error",
      });
    }
  };

  //* Credentials
  const signInWithCredentials = async () => {
    try {
      await signInWithEmailAndPassword(auth, user.email!, user.password!);
      toast({
        title: "Logado com sucesso!",
        status: "success",
      });
    } catch (error: any) {
      toast({
        title: "Erro!",
        description: `Um erro ocorreu! Informações: ${handleErrorCode(
          error.code
        )}`,
        status: "error",
      });
    }
  };

  const getTitle = () => {
    return mode === "login" ? "Bem-vindo de volta!" : "Crie sua conta!";
  };

  return (
    <>
      <Head>
        <title>{getTitle()}</title>
      </Head>
      <Flex sx={sxAuthPage} color={color} bgColor={color!}>
        <ToggleColorMode sx={sxToggleColorMode} />
        <Center sx={sxAuthLogin}>
          <Card w="md">
            <CardBody>
              <Heading mb={4} textAlign="center">
                {getTitle()}
              </Heading>
              <FormControl>
                <FormLabel>E-mail:</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={user?.email}
                  placeholder="Insira seu e-mail..."
                  required
                  onChange={handleChange}
                />
                <FormHelperText />
              </FormControl>
              <FormControl>
                <FormLabel>Senha</FormLabel>
                <InputPassword
                  value={user?.password}
                  required
                  valueChange={handleChange}
                />
                <FormHelperText />
              </FormControl>
            </CardBody>
            <Divider borderColor={color} />
            <CardFooter flexDirection="column" gap={4}>
              <HStack gap={4}>
                <Button
                  w="50%"
                  colorScheme="primary"
                  onClick={signInWithCredentials}
                >
                  {mode === "login" ? "Entrar" : "Cadastrar"}
                </Button>
                <Button w="50%" colorScheme="red" onClick={signInWithGoogle}>
                  <GoogleLogo size={24} weight="bold" />
                </Button>
              </HStack>
              <AuthModeToggle mode={mode} setMode={setMode} />
            </CardFooter>
          </Card>
        </Center>
        <Center sx={sxAuthBanner}>
          <Image
            src="/logo.svg"
            alt="Admin template's logo"
            width={128}
            height={128}
          />
        </Center>
      </Flex>
    </>
  );
}
