import { useState, useEffect } from 'react';

type Theme = 'default' | 'blue' | 'emerald' | 'orange';
type DarkMode = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('default');
  const [darkMode, setDarkMode] = useState<DarkMode>('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedDarkMode = localStorage.getItem('darkMode') as DarkMode;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedDarkMode) setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    // Remove all theme classes
    document.documentElement.classList.remove('theme-blue', 'theme-emerald', 'theme-orange');
    
    // Add current theme class
    if (theme !== 'default') {
      document.documentElement.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    
    const applyDarkMode = () => {
      if (darkMode === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (darkMode === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        // System preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    applyDarkMode();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (darkMode === 'system') {
        applyDarkMode();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [darkMode]);

  return {
    theme,
    setTheme,
    darkMode,
    setDarkMode,
  };
}