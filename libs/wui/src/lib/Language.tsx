export type Languages = 'it' | 'en'

export class Language {
  static readonly DEFAULT_LANGUAGE: Languages = 'en'
  static readonly LANGUAGES: Languages[] = ['it', 'en']

  static getLocalLanguage = () => {
    const localLanguage = navigator.language.split('-')[0] as Languages
    const isIn = this.LANGUAGES.includes(localLanguage);

    return isIn
      ? localLanguage
      : this.DEFAULT_LANGUAGE
  }
}
