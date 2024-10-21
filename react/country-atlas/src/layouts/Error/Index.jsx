import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import {
  Button,
  Center,
  IconButton,
  Stack,
  Tooltip,
  useColorModeValue
} from "@chakra-ui/react";

import { ArrowCounterClockwise } from "phosphor-react";

import { centerSx } from "./style";

export const ErrorLayout = ({ children, pageTitle }) => {
  const color = useColorModeValue("gray.800", "gray.200");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${pageTitle} | Country Atlas`;
  });

  const handleReturn = () => navigate("/", { replace: true });

  return (
    <Center sx={centerSx} bg={!color} color={color}>
      <Stack direction="column" align="center">
        {children}
        <Stack direction="row">
          <Button colorScheme="red" onClick={handleReturn}>
            Voltar para Home
          </Button>
          <Tooltip label="Reiniciar página" placement="right">
            <IconButton
              colorScheme="red"
              aria-label="Refresh page"
              icon={<ArrowCounterClockwise size={24} />}
            />
          </Tooltip>
        </Stack>
      </Stack>
    </Center>
  );
};
