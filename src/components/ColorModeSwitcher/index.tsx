import { FaMoon, FaSun } from "react-icons/fa";
import { useColorMode } from "../../contexts/ColorModeContext";

const ColorModeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const Icon = colorMode === "light" ? FaMoon : FaSun;

  return (
    <button
      type="button"
      onClick={toggleColorMode}
      aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
      className="p-2 rounded-md hover:bg-secondary text-white mr-2"
    >
      <Icon />
    </button>
  );
};

export { ColorModeSwitcher };
