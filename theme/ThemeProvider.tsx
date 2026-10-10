import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ColorMode, applyColorTokens, resolveInitialColorMode } from "./tokens";

interface IThemeContext {
  // Undefined until mounted: the server can't know the visitor's mode.
  colorMode: ColorMode | undefined;
  setColorMode: (mode: ColorMode) => void;
}

const ThemeContext = createContext<IThemeContext>({
  colorMode: undefined,
  setColorMode: () => undefined,
});

export const useTheme = (): IThemeContext => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorMode, setMode] = useState<ColorMode | undefined>(undefined);

  useEffect(() => {
    const root = document.documentElement;
    const initial = resolveInitialColorMode(root);
    applyColorTokens(root, initial);
    setMode(initial);
  }, []);

  const setColorMode = useCallback((mode: ColorMode) => {
    setMode(mode);
    applyColorTokens(document.documentElement, mode);
    try {
      window.localStorage.setItem("color-mode", mode);
    } catch (error) {
      // Storage unavailable (private mode); the choice still applies now.
    }
  }, []);

  const value = useMemo(() => ({ colorMode, setColorMode }), [colorMode, setColorMode]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
