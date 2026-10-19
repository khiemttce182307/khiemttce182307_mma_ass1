import React, { createContext, useState, useContext } from 'react';

// 1. Bang mau chuan cho Light va Dark theme
export const THEMES = {
  light: {
    mode: 'light',
    background: '#F8F9FA',
    card: '#FFFFFF',
    text: '#212529',
    subText: '#6C757D',
    border: '#E9ECEF',
    primary: '#007AFF',
    primaryText: '#FFFFFF',
    danger: '#DC3545',
    success: '#28A745',
    headerBackground: '#007AFF',
    headerTint: '#FFFFFF',
    statusBarStyle: 'light',
  },
  dark: {
    mode: 'dark',
    background: '#121212',
    card: '#1E1E1E',
    text: '#F8F9FA',
    subText: '#A0A0A0',
    border: '#2D2D2D',
    primary: '#0A84FF',
    primaryText: '#FFFFFF',
    danger: '#FF453A',
    success: '#30D158',
    headerBackground: '#1E1E1E',
    headerTint: '#FFFFFF',
    statusBarStyle: 'light',
  },
};

// 2. Tao Context
const ThemeContext = createContext();

// 3. ThemeProvider quan ly state themeMode va cung cap du lieu cho toan app
export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState('light');

  // Ham chuyen doi qua lai giua 'light' va 'dark'
  // Su dung functional update (prevMode) de tranh stale state
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Lay bo mau tuong ung voi themeMode hien tai
  const colors = THEMES[themeMode];

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 4. Custom hook giup cac component con truy cap theme de dang
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
