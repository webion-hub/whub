import { FlagComponent } from 'country-flag-icons/react/3x2';
import { useRouter } from 'next/router';
import { createContext, useContext } from 'react';
import { ChildrenProp } from '../abstractions/props/ChildrenProps';
import { LanguagesCodes } from '../lib/Languages';
import parse from 'html-react-parser';

interface LanguageBaseItem {
  readonly flag?: FlagComponent;
  readonly code: LanguagesCodes;
}

export interface LanguageItem {
  readonly flag?: FlagComponent;
  readonly translation?: any;
}

interface LanguageWrapperProps {
  readonly children: ChildrenProp;
  readonly availableLanguages: AvailableLanguages;
}

type AvailableLanguages = {
  readonly [key in LanguagesCodes]?: LanguageItem;
};

export interface ILanguageContext {
  readonly language?: LanguageBaseItem;
  readonly languages: LanguageBaseItem[];
  readonly setLanguage: (language: LanguagesCodes) => void;
  readonly t: (key: string, shouldParse?: boolean) => string;
}

export const LanguageContext = createContext<ILanguageContext>({
  languages: [] as LanguageBaseItem[],
  setLanguage: () => {
    return;
  },
  t: () => '',
});

export const LanguageWrapper = (props: LanguageWrapperProps) => {
  const router = useRouter();
  const { locale, asPath } = router;

  const setLanguage = (language: LanguagesCodes) => {
    router.push(asPath, asPath, { locale: language });
  };

  const t = (key: string, shouldParse?: boolean) => {
    if (!locale) return key;

    const lang = locale as LanguagesCodes;
    const translation = props.availableLanguages[lang]?.translation[key] ?? key;

    return shouldParse ? parse(translation as string) : translation;
  };

  const getLanguages = (): LanguageBaseItem[] => {
    const entries = Object.entries(props.availableLanguages);

    return entries.map((e) => ({
      code: e[0] as LanguagesCodes,
      flag: e[1].flag,
    }));
  };

  const getLanguage = (): LanguageBaseItem => {
    const code = locale as LanguagesCodes;
    const lang = props.availableLanguages[code];

    return {
      code: code,
      flag: lang?.flag,
    };
  };

  return (
    <LanguageContext.Provider
      value={{
        languages: getLanguages(),
        language: getLanguage(),
        setLanguage: setLanguage,
        t: t,
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
