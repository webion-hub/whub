import { useEffect } from "react"
import { useTranslation } from "react-i18next";

type Languages = 'it' | 'en'
const languages: Languages[] = ['it', 'en']

export const useLanguage = () => {
  const defaultLangugage: Languages = 'en'

  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = getLocalLanguage()
    setLanguage(lang)
  }, [])

  const getLocalLanguage = () => {
    const localLanguage = navigator.language.split('-')[0] as Languages
    const isIn = languages.includes(localLanguage);
    
    return isIn
      ? localLanguage
      : defaultLangugage
  }

  const setLanguage = (language: Languages) => {
    i18n.changeLanguage(language);
  }

  return { language: i18n.language, setLanguage, getLocalLanguage }
}