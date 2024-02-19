import React from 'react';
import { useTheme } from '../ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      Navbar
      Theme: { theme }
      <button onClick={toggleTheme}>Toggle theme</button>
    </div>
  )
}
