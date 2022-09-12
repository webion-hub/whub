import { FlagComponent } from "country-flag-icons/react/3x2";
import { i18n } from "i18next";
import { createContext, useEffect, useState } from "react"
import { ChildrenProp } from "../abstractions/props/ChildrenProps";
import { Language } from "../lib/Language";
import { LanguagesCodes } from "../lib/Languages";

interface LanguageItemWithTranslations extends LanguageItem {
  readonly translations?: any[]
}

export interface LanguageItem {
  readonly code: LanguagesCodes,
  readonly flag?: FlagComponent,
}

interface LanguageWrapperProps {
  readonly children: ChildrenProp,
  readonly i18n: i18n,
  readonly availableLanguages: LanguageItemWithTranslations[],
}

export interface ILanguageContext {
  readonly loading: boolean,
  readonly language: LanguageItem,
  readonly languages: LanguageItem[],
  readonly setLanguage: (language: LanguagesCodes) => void
}

export const LanguageContext = createContext<ILanguageContext>({
  language: Language.DEFAULT_LANGUAGE,
  languages: [],
  loading: false,
  setLanguage: () => { return }
})

export const LanguageWrapper = (props: LanguageWrapperProps) => {
  const [language, setLanguage] = useState<LanguageItem>(Language.DEFAULT_LANGUAGE)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const lang = localStorage.getItem('language')
    const language = lang === 'null' || !lang
      ? Language.getLocalLanguage()
      : lang as LanguagesCodes

    updateLanguage(language)
  }, [])

  const updateLanguage = (language: LanguagesCodes) => {
    setLoading(true)
    setLanguage(
      props.availableLanguages.find(l => l.code === language) ??
      Language.DEFAULT_LANGUAGE
    )

    localStorage.setItem('language', language)

    props.i18n
      .changeLanguage(language)
      .finally(() => setLoading(false))
  }

  return (
    <LanguageContext.Provider
      value={{
        languages: props.availableLanguages,
        language: language,
        loading: loading,
        setLanguage: updateLanguage
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  )
}
