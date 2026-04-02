import { onAuthStateChanged } from "firebase/auth";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { type ColorMode, getUserPreferences, setUserColorMode } from "../hooks/useUserPreferences";

interface ColorModeContextType {
  colorMode: ColorMode;
  toggleColorMode: () => void;
  setColorMode: (mode: ColorMode) => void;
  loading: boolean;
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

export const ColorModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorMode, setColorModeState] = useState<ColorMode>("light");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initColorMode = async () => {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      let mode: ColorMode = prefersDark ? "dark" : "light";

      try {
        const preferences = await getUserPreferences();
        if (preferences?.colorMode) {
          mode = preferences.colorMode;
        }
      } catch {
        // Use system preference as fallback
      }

      setColorModeState(mode);
      setLoading(false);
    };

    initColorMode();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const preferences = await getUserPreferences();
          if (preferences?.colorMode) {
            setColorModeState(preferences.colorMode);
          }
        } catch {
          // Keep current mode
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (colorMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [colorMode]);

  const setColorMode = useCallback(async (mode: ColorMode) => {
    setColorModeState(mode);
    await setUserColorMode(mode);
  }, []);

  const toggleColorMode = useCallback(() => {
    const newMode = colorMode === "light" ? "dark" : "light";
    setColorMode(newMode);
  }, [colorMode, setColorMode]);

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode, setColorMode, loading }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const useColorMode = (): ColorModeContextType => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within ColorModeProvider");
  }
  return context;
};
