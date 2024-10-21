//#region Imports

import Link from "next/link";

import {
  Button,
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Stack,
  useDisclosure,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { List, SignOut } from "@phosphor-icons/react";

import { getAuth } from "firebase/auth";

//#endregion

export function Drawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const color = useColorModeValue("primary", "gray");

  const toast = useToast();

  //* Sign out
  const auth = getAuth();

  const signOut = async () => {
    try {
      await auth.signOut();

      toast({
        title: "Desconectando...",
        status: "info",
      });
    } catch (error) {
      toast({
        title: "Erro!",
        description: `Um erro ocorreu! Informações: ${error}`,
        status: "error",
      });
    }
  };

  return (
    <>
      <IconButton
        aria-label="Toggle Drawer"
        onClick={onOpen}
        colorScheme={color}
        icon={<List size={24} />}
      />
      <ChakraDrawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Admin Template</DrawerHeader>
          <DrawerBody>
            <Stack gap={2}>
              <Button as={Link} href="/">
                Home
              </Button>
              <Button as={Link} href="/settings">
                Configurações
              </Button>
              <Button as={Link} href="/notifications">
                Notificações
              </Button>
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme="red" gap="2" onClick={signOut}>
              Sair <SignOut weight="bold" size={18} />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </ChakraDrawer>
    </>
  );
}
