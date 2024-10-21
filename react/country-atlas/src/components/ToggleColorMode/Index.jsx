import { IconButton, useColorMode } from "@chakra-ui/react";

import { Moon, Sun } from "phosphor-react";

export const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label="Switch color mode"
      icon={colorMode === "light" ? <Sun size={28} /> : <Moon size={28} />}
    />
  );
};
