import React, { useState, createContext, ReactNode, useContext, Context } from 'react'

type Props = {
  children: ReactNode
}

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext: Context<ThemeContextType> = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {}
});

export default function ThemeProvider(props: Props) {
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

// custom hook
export const useTheme = () => useContext(ThemeContext);
