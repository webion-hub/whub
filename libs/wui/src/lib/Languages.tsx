export interface ILanguage {
  readonly code: string,
  readonly translation: string,
}

export type LanguagesCodes = typeof ALL_LANGUAGES[number]["code"]

export const ALL_LANGUAGES =[
  {
      code: "af",
      translation: "Afrikaans",
  },
  {
      code: "ak",
      translation: "Akan",
  },
  {
      code: "am",
      translation: "አማርኛ",
  },
  {
      code: "ar",
      translation: "العربية‏",
  },
  {
      code: "ar-AE",
      translation: "العربية (الإمارات العربية المتحدة)‏",
  },
  {
      code: "ar-BH",
      translation: "العربية (البحرين)‏",
  },
  {
      code: "ar-DZ",
      translation: "العربية (الجزائر)‏",
  },
  {
      code: "ar-EG",
      translation: "العربية (مصر)‏",
  },
  {
      code: "ar-IQ",
      translation: "العربية (العراق)‏",
  },
  {
      code: "ar-JO",
      translation: "العربية (الأردن)‏",
  },
  {
      code: "ar-KW",
      translation: "العربية (الكويت)‏",
  },
  {
      code: "ar-LB",
      translation: "العربية (لبنان)‏",
  },
  {
      code: "ar-LY",
      translation: "العربية (ليبيا)‏",
  },
  {
      code: "ar-MA",
      translation: "العربية (المملكة المغربية)‏",
  },
  {
      code: "ar-OM",
      translation: "العربية (عمان)‏",
  },
  {
      code: "ar-QA",
      translation: "العربية (قطر)‏",
  },
  {
      code: "ar-SA",
      translation: "العربية (المملكة العربية السعودية)‏",
  },
  {
      code: "ar-SY",
      translation: "العربية (سوريا)‏",
  },
  {
      code: "ar-TN",
      translation: "العربية (تونس)‏",
  },
  {
      code: "ar-YE",
      translation: "العربية (اليمن)‏",
  },
  {
      code: "arn",
      translation: "Mapudungun",
  },
  {
      code: "as",
      translation: "অসমীয়া",
  },
  {
      code: "az",
      translation: "Azərbaycan­ılı",
  },
  {
      code: "az-Cyrl-AZ",
      translation: "Азәрбајҹан (Азәрбајҹан)",
  },
  {
      code: "az-Latn-AZ",
      translation: "Azərbaycan­ılı (Azərbaycanca)",
  },
  {
      code: "ba",
      translation: "Башҡорт",
  },
  {
      code: "be",
      translation: "Беларускі",
  },
  {
      code: "bg",
      translation: "български",
  },
  {
      code: "bm",
      translation: "bamanankan",
  },
  {
      code: "bn",
      translation: "বাংলা",
  },
  {
      code: "bn-BD",
      translation: "বাংলা (বাংলা)",
  },
  {
      code: "bn-IN",
      translation: "বাংলা (ভারত)",
  },
  {
      code: "bo",
      translation: "བོད་ཡིག",
  },
  {
      code: "br",
      translation: "brezhoneg",
  },
  {
      code: "bs",
      translation: "bosanski",
  },
  {
      code: "bs-Cyrl",
      translation: "босански",
  },
  {
      code: "bs-Latn",
      translation: "bosanski",
  },
  {
      code: "ca",
      translation: "català",
  },
  {
      code: "co",
      translation: "Corsu",
  },
  {
      code: "cs",
      translation: "čeština",
  },
  {
      code: "cy",
      translation: "Cymraeg",
  },
  {
      code: "da",
      translation: "dansk",
  },
  {
      code: "de",
      translation: "Deutsch",
  },
  {
      code: "de-AT",
      translation: "Deutsch (Österreich)",
  },
  {
      code: "de-CH",
      translation: "Deutsch (Schweiz)",
  },
  {
      code: "de-DE",
      translation: "Deutsch (Deutschland)",
  },
  {
      code: "de-LI",
      translation: "Deutsch (Liechtenstein)",
  },
  {
      code: "de-LU",
      translation: "Deutsch (Luxemburg)",
  },
  {
      code: "dsb",
      translation: "dolnoserbšćina (Nimska)",
  },
  {
      code: "dv",
      translation: "ދިވެހިބަސް‏",
  },
  {
      code: "ee",
      translation: "Eʋegbe",
  },
  {
      code: "el",
      translation: "ελληνικά",
  },
  {
      code: "en",
      translation: "English",
  },
  {
      code: "en-029",
      translation: "English (Caribbean)",
  },
  {
      code: "en-AU",
      translation: "English (Australia)",
  },
  {
      code: "en-BZ",
      translation: "English (Belize)",
  },
  {
      code: "en-CA",
      translation: "English (Canada)",
  },
  {
      code: "en-GB",
      translation: "English (United Kingdom)",
  },
  {
      code: "en-IE",
      translation: "English (Eire)",
  },
  {
      code: "en-IN",
      translation: "English (India)",
  },
  {
      code: "en-JM",
      translation: "English (Jamaica)",
  },
  {
      code: "en-MY",
      translation: "English (Malaysia)",
  },
  {
      code: "en-NZ",
      translation: "English (New Zealand)",
  },
  {
      code: "en-PH",
      translation: "English (Philippines)",
  },
  {
      code: "en-SG",
      translation: "English (Singapore)",
  },
  {
      code: "en-TT",
      translation: "English (Trinidad y Tobago)",
  },
  {
      code: "en-US",
      translation: "English (United States)",
  },
  {
      code: "en-ZA",
      translation: "English (South Africa)",
  },
  {
      code: "en-ZW",
      translation: "English (Zimbabwe)",
  },
  {
      code: "eo",
      translation: "Esperanto",
  },
  {
      code: "es",
      translation: "español",
  },
  {
      code: "es-AR",
      translation: "Español (Argentina)",
  },
  {
      code: "es-BO",
      translation: "Español (Bolivia)",
  },
  {
      code: "es-CL",
      translation: "Español (Chile)",
  },
  {
      code: "es-CO",
      translation: "Español (Colombia)",
  },
  {
      code: "es-CR",
      translation: "Español (Costa Rica)",
  },
  {
      code: "es-DO",
      translation: "Español (República Dominicana)",
  },
  {
      code: "es-EC",
      translation: "Español (Ecuador)",
  },
  {
      code: "es-ES",
      translation: "español (España)",
  },
  {
      code: "es-GT",
      translation: "Español (Guatemala)",
  },
  {
      code: "es-HN",
      translation: "Español (Honduras)",
  },
  {
      code: "es-MX",
      translation: "Español (México)",
  },
  {
      code: "es-NI",
      translation: "Español (Nicaragua)",
  },
  {
      code: "es-PA",
      translation: "Español (Panamá)",
  },
  {
      code: "es-PE",
      translation: "Español (Perú)",
  },
  {
      code: "es-PR",
      translation: "Español (Puerto Rico)",
  },
  {
      code: "es-PY",
      translation: "Español (Paraguay)",
  },
  {
      code: "es-SV",
      translation: "Español (El Salvador)",
  },
  {
      code: "es-US",
      translation: "Español (Estados Unidos)",
  },
  {
      code: "es-UY",
      translation: "Español (Uruguay)",
  },
  {
      code: "es-VE",
      translation: "Español (Republica Bolivariana de Venezuela)",
  },
  {
      code: "et",
      translation: "eesti",
  },
  {
      code: "eu",
      translation: "euskara",
  },
  {
      code: "fa",
      translation: "فارسى‏",
  },
  {
      code: "fi",
      translation: "suomi",
  },
  {
      code: "fil",
      translation: "Filipino",
  },
  {
      code: "fo",
      translation: "føroyskt",
  },
  {
      code: "fr",
      translation: "français",
  },
  {
      code: "fr-BE",
      translation: "français (Belgique)",
  },
  {
      code: "fr-CA",
      translation: "français (Canada)",
  },
  {
      code: "fr-CH",
      translation: "français (Suisse)",
  },
  {
      code: "fr-FR",
      translation: "français (France)",
  },
  {
      code: "fr-LU",
      translation: "français (Luxembourg)",
  },
  {
      code: "fr-MC",
      translation: "français (Principauté de Monaco)",
  },
  {
      code: "fy",
      translation: "Frysk",
  },
  {
      code: "ga",
      translation: "Gaeilge",
  },
  {
      code: "gd",
      translation: "Gàidhlig",
  },
  {
      code: "gl",
      translation: "galego",
  },
  {
      code: "gn",
      translation: "Avañe'ẽ",
  },
  {
      code: "gsw",
      translation: "Elsässisch",
  },
  {
      code: "gu",
      translation: "ગુજરાતી",
  },
  {
      code: "ha",
      translation: "Hausa",
  },
  {
      code: "he",
      translation: "עברית‏",
  },
  {
      code: "hi",
      translation: "हिंदी",
  },
  {
      code: "hr",
      translation: "hrvatski",
  },
  {
      code: "hr-BA",
      translation: "hrvatski (Bosna i Hercegovina)",
  },
  {
      code: "hr-HR",
      translation: "hrvatski (Hrvatska)",
  },
  {
      code: "hsb",
      translation: "hornjoserbšćina (Němska)",
  },
  {
      code: "ht",
      translation: "Kreyòl ayisyen",
  },
  {
      code: "hu",
      translation: "magyar",
  },
  {
      code: "hy",
      translation: "Հայերեն",
  },
  {
      code: "id",
      translation: "Bahasa Indonesia",
  },
  {
      code: "ig",
      translation: "Igbo",
  },
  {
      code: "ii",
      translation: "ꆈꌠꁱꂷ",
  },
  {
      code: "is",
      translation: "íslenska",
  },
  {
      code: "it",
      translation: "italiano",
  },
  {
      code: "it-CH",
      translation: "italiano (Svizzera)",
  },
  {
      code: "it-IT",
      translation: "italiano (Italia)",
  },
  {
      code: "iu",
      translation: "Inuktitut",
  },
  {
      code: "ja",
      translation: "日本語",
  },
  {
      code: "jv",
      translation: "ꦧꦱꦗꦮ",
  },
  {
      code: "ka",
      translation: "ქართული",
  },
  {
      code: "kg",
      translation: "Kongo",
  },
  {
      code: "ki",
      translation: "Gĩkũyũ",
  },
  {
      code: "kk",
      translation: "Қазащb",
  },
  {
      code: "kl",
      translation: "kalaallisut",
  },
  {
      code: "km",
      translation: "ខ្មែរ",
  },
  {
      code: "kn",
      translation: "ಕನ್ನಡ",
  },
  {
      code: "ko",
      translation: "한국어",
  },
  {
      code: "kok",
      translation: "कोंकणी",
  },
  {
      code: "kr",
      translation: "Kanuri",
  },
  {
      code: "ks",
      translation: "कॉशुर, كٲشُر",
  },
  {
      code: "ky",
      translation: "Кыргыз",
  },
  {
      code: "lb",
      translation: "Lëtzebuergesch",
  },
  {
      code: "lg",
      translation: "Luganda",
  },
  {
      code: "ln",
      translation: "Lingála",
  },
  {
      code: "lo",
      translation: "ລາວ",
  },
  {
      code: "lt",
      translation: "lietuvių",
  },
  {
      code: "lv",
      translation: "latviešu",
  },
  {
      code: "mg",
      translation: "fiteny malagasy",
  },
  {
      code: "mi",
      translation: "Reo Māori",
  },
  {
      code: "mk",
      translation: "македонски јазик",
  },
  {
      code: "ml",
      translation: "മലയാളം",
  },
  {
      code: "mn",
      translation: "Монгол хэл",
  },
  {
      code: "mn-MN",
      translation: "Монгол хэл (Монгол улс)",
  },
  {
      code: "mn-Mong-CN",
      translation: "ᠮᠣᠩᠭᠤᠯ ᠬᠡᠯᠡ (ᠪᠦᠭᠦᠳᠡ ᠨᠠᠢᠷᠠᠮᠳᠠᠬᠤ ᠳᠤᠮᠳᠠᠳᠤ ᠠᠷᠠᠳ ᠣᠯᠣᠰ)",
  },
  {
      code: "moh",
      translation: "Kanien'kéha",
  },
  {
      code: "mr",
      translation: "मराठी",
  },
  {
      code: "ms",
      translation: "Bahasa Malaysia",
  },
  {
      code: "ms-BN",
      translation: "Bahasa Malaysia (Brunei Darussalam)",
  },
  {
      code: "ms-MY",
      translation: "Bahasa Malaysia (Malaysia)",
  },
  {
      code: "mt",
      translation: "Malti",
  },
  {
      code: "my",
      translation: "မြန်မာစာ",
  },
  {
      code: "nb",
      translation: "norsk",
  },
  {
      code: "nb-NO",
      translation: "norsk, bokmål (Norge)",
  },
  {
      code: "ne",
      translation: "नेपाली",
  },
  {
      code: "nl",
      translation: "Nederlands",
  },
  {
      code: "nl-BE",
      translation: "Nederlands (België)",
  },
  {
      code: "nl-NL",
      translation: "Nederlands (Nederland)",
  },
  {
      code: "nn",
      translation: "norsk, nynorsk",
  },
  {
      code: "no",
      translation: "norsk",
  },
  {
      code: "nso",
      translation: "Sesotho sa Leboa",
  },
  {
      code: "ny",
      translation: "Nyanja (Chichewa)",
  },
  {
      code: "oc",
      translation: "Occitan",
  },
  {
      code: "om",
      translation: "Afaan Oromoo",
  },
  {
      code: "or",
      translation: "ଓଡ଼ିଆ",
  },
  {
      code: "pa",
      translation: "ਪੰਜਾਬੀ",
  },
  {
      code: "pl",
      translation: "polski",
  },
  {
      code: "prs",
      translation: "درى",
  },
  {
      code: "ps",
      translation: "پښتو",
  },
  {
      code: "pt",
      translation: "Português",
  },
  {
      code: "pt-BR",
      translation: "Português (Brasil)",
  },
  {
      code: "pt-PT",
      translation: "português (Portugal)",
  },
  {
      code: "qu",
      translation: "runasimi",
  },
  {
      code: "quc",
      translation: "K'iche",
  },
  {
      code: "rm",
      translation: "Rumantsch",
  },
  {
      code: "rn",
      translation: "Ikirundi",
  },
  {
      code: "ro",
      translation: "română",
  },
  {
      code: "ru",
      translation: "русский",
  },
  {
      code: "rw",
      translation: "Kinyarwanda",
  },
  {
      code: "sa",
      translation: "संस्कृत",
  },
  {
      code: "sah",
      translation: "саха",
  },
  {
      code: "sc",
      translation: "sardu",
  },
  {
      code: "sd",
      translation: "سنڌي‎, सिन्धी, ਸਿੰਧੀ",
  },
  {
      code: "se",
      translation: "davvisámegiella",
  },
  {
      code: "si",
      translation: "සිංහ",
  },
  {
      code: "sk",
      translation: "slovenčina",
  },
  {
      code: "sl",
      translation: "slovenski",
  },
  {
      code: "sn",
      translation: "chiShona",
  },
  {
      code: "so",
      translation: "Soomaaliga, af Soomaali",
  },
  {
      code: "sq",
      translation: "shqipe",
  },
  {
      code: "sr",
      translation: "srpski",
  },
  {
      code: "sr-Cyrl-BA",
      translation: "српски (Босна и Херцеговина)",
  },
  {
      code: "sr-Cyrl-SP",
      translation: "српски (Србија и Црна Гора)",
  },
  {
      code: "sr-Latn-BA",
      translation: "srpski (Bosna i Hercegovina)",
  },
  {
      code: "sr-Latn-SP",
      translation: "srpski (Srbija i Crna Gora)",
  },
  {
      code: "st",
      translation: "Sesotho",
  },
  {
      code: "su",
      translation: "Basa Sunda",
  },
  {
      code: "sv",
      translation: "svenska",
  },
  {
      code: "sv-FI",
      translation: "svenska (Finland)",
  },
  {
      code: "sv-SE",
      translation: "svenska (Sverige)",
  },
  {
      code: "sw",
      translation: "Kiswahili",
  },
  {
      code: "syr",
      translation: "ܣܘܪܝܝܐ‏",
  },
  {
      code: "ta",
      translation: "தமிழ்",
  },
  {
      code: "te",
      translation: "తెలుగు",
  },
  {
      code: "tg",
      translation: "Тоҷикӣ",
  },
  {
      code: "th",
      translation: "ไทย",
  },
  {
      code: "ti",
      translation: "ትግርኛ",
  },
  {
      code: "tk",
      translation: "türkmençe",
  },
  {
      code: "tl",
      translation: "Wikang Tagalog",
  },
  {
      code: "tn",
      translation: "Setswana",
  },
  {
      code: "tr",
      translation: "Türkçe",
  },
  {
      code: "ts",
      translation: "Xitsonga",
  },
  {
      code: "tt",
      translation: "Татар",
  },
  {
      code: "tzm",
      translation: "Tamazight",
  },
  {
      code: "ug",
      translation: "ئۇيغۇر يېزىقى",
  },
  {
      code: "uk",
      translation: "україньска",
  },
  {
      code: "ur",
      translation: "اُردو‏",
  },
  {
      code: "uz",
      translation: "U'zbek",
  },
  {
      code: "uz-Cyrl-UZ",
      translation: "Ўзбек (Ўзбекистон)",
  },
  {
      code: "uz-Latn-UZ",
      translation: "U'zbek (U'zbekiston Respublikasi)",
  },
  {
      code: "ve",
      translation: "Tshivenḓa",
  },
  {
      code: "vi",
      translation: "Tiếng Việt",
  },
  {
      code: "wo",
      translation: "Wolof",
  },
  {
      code: "xh",
      translation: "isiXhosa",
  },
  {
      code: "yo",
      translation: "Yoruba",
  },
  {
      code: "zh-CN",
      translation: "中文(中华人民共和国)",
  },
  {
      code: "zh-Hans",
      translation: "中文(简体)",
  },
  {
      code: "zh-Hant",
      translation: "中文(繁體)",
  },
  {
      code: "zh-HK",
      translation: "中文(香港特别行政區)",
  },
  {
      code: "zh-MO",
      translation: "中文(澳門特别行政區)",
  },
  {
      code: "zh-SG",
      translation: "中文(新加坡)",
  },
  {
      code: "zh-TW",
      translation: "中文(台灣)",
  },
  {
      code: "zu",
      translation: "isiZulu",
  }
] as const

