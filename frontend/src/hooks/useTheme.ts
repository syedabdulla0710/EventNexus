import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('eventnexus-theme');
    if (saved) return saved === 'dark';
    return true; // Default to dark mode for all new users
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('eventnexus-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('eventnexus-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return { isDark, toggleTheme };
};
