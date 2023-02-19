import { useRouter } from 'next/router';
import { Context, createContext, ReactNode } from 'react';

interface LanguageBaseItem {
  readonly flag?: ReactNode;
  readonly code: string;
  readonly langTranslation: string;
}

export interface LanguageItem {
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
};

export interface ILanguageContext {
  readonly language?: LanguageBaseItem;
  readonly languages: LanguageBaseItem[];
  readonly setLanguage: (language: string) => void;
  readonly t: (key: string) => string;
  readonly tHtml: (key: string) => string | JSX.Element | JSX.Element[];
}

export const LanguageContext: Context<ILanguageContext> = createContext<ILanguageContext>({
  languages: [] as LanguageBaseItem[],
  setLanguage: () => { return; },
  t: () => '',
  tHtml: () => '',
});

export const LanguageWrapper = (props: LanguageWrapperProps) => {
  const router = useRouter();
  const { locale, asPath } = router;

  const setLanguage = (language: string) => {
    router.push(asPath, asPath, { locale: language });
  };

  const t = (key: string) => {
    if (!locale) return key;

    const lang = locale as string;
    const translation = props.availableLanguages[lang]?.translation?.[key] ?? key;

    return translation;
  };

  const tHtml = (key: string) => {
    return (
      <span dangerouslySetInnerHTML={{ __html: t(key) }}/>
    )
  };

  const getLanguages = (): LanguageBaseItem[] => {
    const entries = Object.entries(props.availableLanguages);

    return entries.map((e) => ({
      code: e[0] as string,
      flag: e[1].flag,
      langTranslation: e[1].langTranslation
    }));
  };

  const getLanguage = (): LanguageBaseItem => {
    const code = locale as string;
    const lang = props.availableLanguages[code];

    return {
      code: code,
      flag: lang?.flag,
      langTranslation: lang.langTranslation
    };
  };

  return (
    <LanguageContext.Provider
      value={{
        languages: getLanguages(),
        language: getLanguage(),
        setLanguage: setLanguage,
        t,
        tHtml,
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
};
