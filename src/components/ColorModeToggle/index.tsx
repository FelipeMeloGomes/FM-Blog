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
      className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-all duration-200 border border-transparent hover:border-border/50"
    >
      <div className="relative w-5 h-5">
        <FiSun
          size={18}
          className={`absolute inset-0 transition-all duration-300 ${
            isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
          }`}
        />
        <FiMoon
          size={18}
          className={`absolute inset-0 transition-all duration-300 ${
            isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
          }`}
        />
      </div>
    </button>
  );
};

export { ColorModeToggle };
