import { useRouter } from 'next/router';
import { createContext, ReactNode, useEffect } from 'react';
import { useSubject } from '@wui/core/hooks/useSubject';
import { BehaviorSubject, filter, Observable, skip } from 'rxjs';

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

interface LanguageChangeEvent {
  preventRouteNavigation: boolean,
  lang: string,
  redirectRoute: string 
}

export interface ILanguageContext {
  readonly language?: LanguageBaseItem;
  readonly getStorageLanguage: () => LanguageBaseItem;
  readonly languages: LanguageBaseItem[];
  readonly setLanguage: (language: string) => void;
  readonly t: (key: string) => string;
  readonly tHtml: (key: string) => string | JSX.Element | JSX.Element[];
  readonly languageChange: Observable<LanguageChangeEvent>;
}

export const LanguageContext = createContext<ILanguageContext>({
  languages: [] as LanguageBaseItem[],
  setLanguage: () => { return; },
  getStorageLanguage: () => { return {} as LanguageBaseItem; },
  t: () => '',
  tHtml: () => '',
  languageChange: new BehaviorSubject<LanguageChangeEvent>({ 
    preventRouteNavigation: false, 
    lang: '', 
    redirectRoute: ''
  })
});

export const LanguageWrapper = (props: LanguageWrapperProps) => {
  const router = useRouter();
  const { locale, asPath } = router;

  const languageChange = useSubject<LanguageChangeEvent>({
    preventRouteNavigation: false,
    lang: '',
    redirectRoute: asPath
  });

  const routeNavigator = useSubject<LanguageChangeEvent>({
    preventRouteNavigation: false,
    lang: '',
    redirectRoute: asPath
  });
  
  const getStorageLanguage = () => 
    window?.localStorage?.getItem('language') 
    ?? locale
    ?? 'it'
    
  useEffect(() => {
    const storageLanguage = getStorageLanguage()
    const isOnRightRoute = storageLanguage === locale

    if(isOnRightRoute || !storageLanguage)
      return

    setLanguage(storageLanguage)
  }, [])

  useEffect(() => {
    const sub = routeNavigator
      .pipe(filter(e => !e.preventRouteNavigation))
      .subscribe((e) => router.push(e.redirectRoute, e.redirectRoute, { locale: e.lang }))

    return () => sub.unsubscribe()
  }, [])

  const setLanguage = (language: string) => {
    const e: LanguageChangeEvent = {
      preventRouteNavigation: false,
      lang: language,
      redirectRoute: asPath,
    }

    languageChange.next(e)
    routeNavigator.next(e)

    window.localStorage.setItem('language', language)
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

  const getLanguage = (code: string): LanguageBaseItem => {
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
        languageChange: languageChange.pipe(skip(1)),
        languages: getLanguages(),
        language: getLanguage(locale as string),
        getStorageLanguage: () => getLanguage(getStorageLanguage()),
        setLanguage: setLanguage,
        t,
        tHtml,
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
};
