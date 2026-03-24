import { IconButton, Tooltip, useColorMode } from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Tooltip label="Alternar tema" hasArrow>
      <IconButton
        aria-label="Alternar tema"
        icon={isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
        variant="ghost"
        size="sm"
        borderRadius="full"
        onClick={toggleColorMode}
        _hover={{ bg: "bg.secondary" }}
        transition="transform 0.3s"
        transform={isDark ? "rotate(0deg)" : "rotate(180deg)"}
      />
    </Tooltip>
  );
};

export { ColorModeToggle };
