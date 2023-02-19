import { Theme, ThemeProvider } from '@mui/material';
import { Context, createContext, ReactNode, useEffect, useState } from 'react';

export interface IThemeContext {
  readonly setTheme: (key: ThemeKeys) => void;
  readonly currentTheme: ThemeKeys;
}

export const ThemeContext: Context<IThemeContext> = createContext<IThemeContext>({
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

