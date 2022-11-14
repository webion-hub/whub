import { Palette, Theme, ThemeProvider, useMediaQuery } from '@mui/material';
import { createContext, useContext, useEffect, useState } from 'react';
import { ChildrenProp } from '../abstractions/props/ChildrenProps';

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
  readonly children: ChildrenProp;
}

export const ThemeWrapper = (props: ThemeWrapperProps) => {
  const [theme, setTheme] = useState<ThemeKeys>('light');

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    const areNoSavedTheme = localTheme === 'null' || !localTheme

    const theme = areNoSavedTheme
      ? getBrowserTheme()
      : localTheme
    updateTheme(theme as ThemeKeys);
  }, []);

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

export const useThemeChanger = () => useContext(ThemeContext);
