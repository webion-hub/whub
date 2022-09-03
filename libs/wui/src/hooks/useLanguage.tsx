import { useContext } from "react"
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../contexts/ContextLanguage";

export const useLanguage = () => useContext(LanguageContext)
