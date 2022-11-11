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
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const defaultTheme = prefersDarkMode ? 'dark' : 'light';

  const [theme, setTheme] = useState<ThemeKeys>(defaultTheme);

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');

    if (localTheme === 'null' || !localTheme) return;

    updateTheme(localTheme as ThemeKeys);
  }, []);

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
