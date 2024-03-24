import React, { useState, createContext, ReactNode, useContext, Context } from 'react'

type Props = {
  children: ReactNode
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  isThemeLight: boolean;
}

const ThemeContext: Context<ThemeContextType> = createContext<ThemeContextType>({
  theme: Theme.LIGHT,
  toggleTheme: () => {},
  isThemeLight: true
});

export default function ThemeProvider(props: Props) {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };
  const isThemeLight = theme === Theme.LIGHT;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isThemeLight }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

// custom hook
export const useTheme = () => useContext(ThemeContext);
