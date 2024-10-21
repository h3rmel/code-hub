//#region Imports

import { default as NextLink } from "next/link";

import { ToggleColorMode, Drawer } from "../Index";

import {
  HStack,
  Container,
  Menu,
  MenuList,
  MenuItem,
  Avatar,
  MenuButton,
  Link,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { SignOut } from "@phosphor-icons/react";

import { getAuth } from "firebase/auth";

//#endregion

export function Navbar({ sxStack, sxContainer, userInfo }: NavbarLayoutProps) {
  const color = useColorModeValue("dark.500", "light.500");
  const bgColor = useColorModeValue("primary.700", "dark.600");

  const toast = useToast();

  //* Sign Out
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
        title: `Erro!`,
        description: `Um erro ocorreu! Informações: ${error}`,
        status: "error",
      });
    }
  };

  return (
    <HStack sx={sxStack} color={color} bgColor={bgColor}>
      <Container sx={sxContainer}>
        <Drawer />
        <HStack gap="2">
          <ToggleColorMode size="sm" />
          <Menu>
            <MenuButton>
              <Avatar
                size="md"
                name={
                  userInfo?.displayName !== null
                    ? userInfo?.displayName
                    : "John Doe"
                }
                src={
                  userInfo?.photoURL !== null
                    ? userInfo?.photoURL
                    : "./avatar-placeholder.png"
                }
              />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link as={NextLink} w="100%" href="/profile">
                  Perfil
                </Link>
              </MenuItem>
              <MenuItem gap="2" onClick={signOut}>
                Sair <SignOut weight="bold" size={16} />
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Container>
    </HStack>
  );
}
