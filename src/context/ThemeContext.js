import React, { createContext, useState, useEffect, useContext } from 'react';
import { getItem, setItem } from '../storage/storage';
import { STORAGE_KEYS } from '../constants/storageKeys';

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

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState('light');
  // Loading state de ngan chan hien tuong nhay sai theme (Theme Flash)
  const [isLoadingTheme, setIsLoadingTheme] = useState(true);

  // Hydrate: Doc theme da luu tu AsyncStorage khi ung dung khoi dong
  useEffect(() => {
    async function hydrateTheme() {
      try {
        const savedMode = await getItem(STORAGE_KEYS.THEME, 'light');
        if (savedMode === 'dark' || savedMode === 'light') {
          setThemeMode(savedMode);
        }
      } catch (error) {
        console.warn('[ThemeContext] Error during hydration:', error);
      } finally {
        setIsLoadingTheme(false);
      }
    }

    hydrateTheme();
  }, []);

  // Chuyen doi theme va luu vao AsyncStorage
  const toggleTheme = async () => {
    const nextMode = themeMode === 'light' ? 'dark' : 'light';
    // 1. Cap nhat state tren RAM ngay lap tuc de UI phan hoi tuc thi
    setThemeMode(nextMode);
    // 2. Ghi vao storage bat dong bo co await
    await setItem(STORAGE_KEYS.THEME, nextMode);
  };

  const colors = THEMES[themeMode];

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, colors, isLoadingTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
