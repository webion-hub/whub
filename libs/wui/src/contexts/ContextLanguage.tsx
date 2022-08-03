import { i18n } from "i18next";
import { createContext, useState } from "react"
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
  const [loading, setLoading] = useState(false)

  const setLanguage = (language: Languages) => {
    setLoading(true)

    props.i18n
      .changeLanguage(language)
      .finally(() => setLoading(false))
  }

  return (
    <LanguageContext.Provider
      value={{
        language: props.i18n.language,
        loading: loading,
        setLanguage: setLanguage
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  )
} 