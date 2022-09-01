import { i18n } from "i18next";
import { createContext, useEffect, useState } from "react"
import { ChildrenProp } from "../abstractions/props/ChildrenProps";
import { Language, Languages } from "../lib/Language";

interface LanguageWrapperProps {
  readonly children: ChildrenProp,
  readonly i18n: i18n
}

interface ILanguageContext {
  readonly loading: boolean,
  readonly language: string,
  readonly setLanguage: (language: Languages) => void
}

export const LanguageContext = createContext<ILanguageContext>({
  language: Language.DEFAULT_LANGUAGE,
  loading: false,
  setLanguage: () => { return }
})

export const LanguageWrapper = (props: LanguageWrapperProps) => {
  const [language, setLanguage] = useState<Languages>(Language.DEFAULT_LANGUAGE)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const lang = localStorage.getItem('language')
    const language = lang === 'null'
      ? Language.getLocalLanguage()
      : lang as Languages

    updateLanguage(language)
  }, [])

  const updateLanguage = (language: Languages) => {
    setLoading(true)
    setLanguage(language)

    localStorage.setItem('language', language)

    props.i18n
      .changeLanguage(language)
      .finally(() => setLoading(false))
  }

  return (
    <LanguageContext.Provider
      value={{
        language: language,
        loading: loading,
        setLanguage: updateLanguage
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  )
}
