import { GB } from "country-flag-icons/react/3x2";
import { Utils } from "..";
import { LanguageItem } from "../contexts/ContextLanguage";
import { ALL_LANGUAGES, LanguagesCodes } from "./Languages";

export class Language {
  static readonly DEFAULT_LANGUAGE: LanguageItem = {
    code: 'en',
    flag: GB
  }

  static getLocalLanguage = () => {
    const localLanguage = navigator.language.split('-')[0] as LanguagesCodes
    const isIn = !!ALL_LANGUAGES.find(l => localLanguage === l.code);

    return isIn
      ? localLanguage
      : this.DEFAULT_LANGUAGE.code
  }

  static getTranslation = (lang: LanguagesCodes) => {
    const translation = ALL_LANGUAGES.find(l => l.code === lang)
      ?.translation
      ?? ''

    return Utils.capitalizeFirstLetter(translation)
  }
}
