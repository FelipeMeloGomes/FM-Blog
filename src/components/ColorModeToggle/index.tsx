import { IconButton, Tooltip, useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";

const MotionIconButton = motion(IconButton);

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Tooltip label="Alternar tema" hasArrow>
      <MotionIconButton
        aria-label="Alternar tema"
        icon={isDark ? <FiSun /> : <FiMoon />}
        variant="ghost"
        size="sm"
        borderRadius="full"
        onClick={toggleColorMode}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
        _hover={{ bg: "bg.secondary" }}
      />
    </Tooltip>
  );
};

export { ColorModeToggle };
