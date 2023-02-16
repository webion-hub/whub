import { useContext } from "react";
import { LanguageContext } from "../Language/Language";

export const useLanguage = () => useContext(LanguageContext);