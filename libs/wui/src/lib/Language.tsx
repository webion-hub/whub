import { FlagComponent } from "country-flag-icons/react/3x2";

interface ILanguage {
  readonly flag: FlagComponent,
  readonly lang: string,
  readonly translation: string,
}

export type Languages = 'it' | 'en' | 'es'

export class Language {
  static readonly DEFAULT_LANGUAGE: Languages = 'en'
  static readonly LANGUAGES: Languages[] = ['it', 'en', 'es']

  static getLocalLanguage = () => {
    const localLanguage = navigator.language.split('-')[0] as Languages
    const isIn = this.LANGUAGES.includes(localLanguage);

    return isIn
      ? localLanguage
      : this.DEFAULT_LANGUAGE
  }
}
