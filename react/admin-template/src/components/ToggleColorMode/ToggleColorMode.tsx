//#region Imports

import { useMemo } from "react";

import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";

import { Moon, Sun } from "@phosphor-icons/react";

//#endregion

export function ToggleColorMode({ sx, size = "md" }: ToggleColorModeProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  const color = useColorModeValue("primary", "gray");

  const iconSize = useMemo(() => {
    let sizeMap: Record<string, number> = {
      lg: 28,
      sm: 20,
      xs: 16,
    };

    return sizeMap[size] || 24;
  }, [size]);

  return (
    <IconButton
      sx={sx}
      onClick={toggleColorMode}
      colorScheme={color}
      aria-label="Toggle Color mode"
      size={size}
      borderRadius="full"
      icon={
        colorMode === "light" ? (
          <Sun size={iconSize} />
        ) : (
          <Moon size={iconSize} />
        )
      }
    />
  );
}
