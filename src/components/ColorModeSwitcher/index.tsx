import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorModeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const Icon = colorMode === "light" ? FaMoon : FaSun;
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const hoverBg = useColorModeValue("gray.200", "gray.600");

  return (
    <IconButton
      aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
      icon={<Icon />}
      onClick={toggleColorMode}
      bg={bgColor}
      _hover={{ bg: hoverBg }}
      size="md"
      fontSize="lg"
      variant="ghost"
      color="white"
      mr={2}
    />
  );
};

export { ColorModeSwitcher };
