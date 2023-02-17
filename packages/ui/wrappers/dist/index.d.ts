import * as react from 'react';
import { ReactNode } from 'react';
import { Theme } from '@mui/material';

interface LanguageBaseItem {
    readonly flag?: ReactNode;
    readonly code: string;
    readonly langTranslation: string;
}
interface LanguageItem {
    readonly flag?: ReactNode;
    readonly langTranslation: string;
    readonly translation?: any;
}
interface LanguageWrapperProps {
    readonly children: ReactNode;
    readonly availableLanguages: AvailableLanguages;
}
interface AvailableLanguages {
    readonly [key: string]: LanguageItem;
}
interface ILanguageContext {
    readonly language?: LanguageBaseItem;
    readonly languages: LanguageBaseItem[];
    readonly setLanguage: (language: string) => void;
    readonly t: (key: string) => string;
    readonly tHtml: (key: string) => string | JSX.Element | JSX.Element[];
}
declare const LanguageContext: react.Context<ILanguageContext>;
declare const LanguageWrapper: (props: LanguageWrapperProps) => JSX.Element;

interface IThemeContext {
    readonly setTheme: (key: ThemeKeys) => void;
    readonly currentTheme: ThemeKeys;
}
declare const ThemeContext: react.Context<IThemeContext>;
type ThemeKeys = 'dark' | 'light';
type Themes = Record<ThemeKeys, Theme>;
interface ThemeWrapperProps {
    readonly themes: Themes;
    readonly children: ReactNode;
}
declare const ThemeWrapper: (props: ThemeWrapperProps) => JSX.Element;

declare const useLanguage: () => ILanguageContext;

declare const useThemeChanger: () => IThemeContext;

export { ILanguageContext, IThemeContext, LanguageContext, LanguageItem, LanguageWrapper, ThemeContext, ThemeKeys, ThemeWrapper, ThemeWrapperProps, Themes, useLanguage, useThemeChanger };
