import { useContext } from "react"
import { LanguageContext } from "../contexts/ContextLanguage";

export const useLanguage = () => useContext(LanguageContext)
