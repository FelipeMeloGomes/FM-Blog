import { FiMoon, FiSun } from "react-icons/fi";
import { useColorMode } from "../../contexts/ColorModeContext";

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <button
      type="button"
      onClick={toggleColorMode}
      aria-label="Alternar tema"
      className="p-2 rounded-full hover:bg-secondary text-foreground transition-all duration-300 border border-border"
    >
      {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
};

export { ColorModeToggle };
