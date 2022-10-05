import { Utils } from '..';
import { ALL_LANGUAGES, LanguagesCodes } from './Languages';

export class Language {
  static getTranslation = (lang: LanguagesCodes) => {
    const translation =
      ALL_LANGUAGES.find((l) => l.code === lang)?.translation ?? '';

    return Utils.capitalizeFirstLetter(translation);
  };
}
