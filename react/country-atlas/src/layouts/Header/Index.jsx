import { useRef } from "react";

import { ToggleColorMode } from "@/components/Index";

import { NavLink } from "react-router-dom";

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Link,
  Stack,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";

import { List } from "phosphor-react";

import { boxSx, drawerSx, flexSx, imgSx, mobileSx, stackSx } from "./style";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const color = useColorModeValue("gray.800", "gray.200");
  const bg = useColorModeValue("white", "gray.900");
  const logo = useColorModeValue("/logo-light.svg", "/logo-dark.svg");
  return (
    <Box bg={bg} color={color} sx={boxSx}>
      <Flex sx={flexSx}>
        <Image src={logo} sx={imgSx} alt="Webpage logo" />
        {/* For Desktop */}
        <Stack direction="row" sx={stackSx}>
          <NavLink to="/">
            <Button variant="ghost">Home</Button>
          </NavLink>
          <Link href="https://github.com/H3rmel/country-atlas" isExternal>
            <Button variant="ghost">GitHub</Button>
          </Link>
          <ToggleColorMode />
        </Stack>
        {/* For Mobile */}
        <IconButton
          sx={mobileSx}
          aria-label="Drawer opener"
          icon={<List size={24} />}
          onClick={onOpen}
          ref={btnRef}
        />
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Image src={logo} width="128px" alt="Webpage logo" />
            </DrawerHeader>
            <DrawerBody sx={drawerSx}>
              <NavLink to="/">
                <Button w="100%">Home</Button>
              </NavLink>
            </DrawerBody>
            <DrawerFooter>
              <Link href="https://github.com/H3rmel/country-atlas" isExternal>
                <Button variant="ghost">GitHub</Button>
              </Link>
              <ToggleColorMode />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};
