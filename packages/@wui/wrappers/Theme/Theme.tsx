import { Theme, ThemeProvider } from '@mui/material';
import { createContext, ReactNode, useEffect, useState } from 'react';

export interface IThemeContext {
  readonly setTheme: (key: ThemeKeys) => void;
  readonly currentTheme: ThemeKeys;
}

export const ThemeContext = createContext<IThemeContext>({
  setTheme: () => { return; },
  currentTheme: 'dark',
});

export type ThemeKeys = 'dark' | 'light';

export type Themes = Record<ThemeKeys, Theme>;

export interface ThemeWrapperProps {
  readonly themes: Themes;
  readonly children: ReactNode;
}


export const ThemeWrapper = (props: ThemeWrapperProps) => {
  const getTheme = () => {
    const localTheme = localStorage.getItem('theme');
    const areNoSavedTheme = localTheme === 'null' || !localTheme
  
    return areNoSavedTheme
      ? getBrowserTheme()
      : localTheme as ThemeKeys
  }
  
  const getBrowserTheme = () => {
    const isDarkTheme = window
      .matchMedia("(prefers-color-scheme: dark)")
      .matches
  
    return isDarkTheme
      ? 'dark'
      : 'light'
  }

  const updateTheme = (key: ThemeKeys) => {
    setTheme(key);
    localStorage.setItem('theme', key);
  };

  const [theme, setTheme] = useState<ThemeKeys>(getTheme());

  return (
    <ThemeContext.Provider
      value={{
        setTheme: updateTheme,
        currentTheme: theme,
      }}
    >
      <ThemeProvider theme={props.themes[theme]}>
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

