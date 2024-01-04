export const dateFormateOptions = {
  localeMatcher: 'best fit', // "lookup" or "best fit"
  weekday: undefined, // "narrow", "short", "long"
  era: undefined, // "narrow", "short", "long"
  year: 'numeric', // "numeric", "2-digit"
  month: 'numeric', // "numeric", "2-digit", "narrow", "short", "long"
  day: 'numeric', // "numeric", "2-digit"
  hour: 'numeric', // "numeric", "2-digit"
  minute: 'numeric', // "numeric", "2-digit"
  second: 'numeric', // "numeric", "2-digit"
  timeZoneName: 'short', // "short", "long"
  hour12: undefined, // true or false
  timeZone: undefined // e.g., "UTC", "Europe/London"}
}
export interface DateTimeFormatOptions {
  localeMatcher?: 'lookup' | 'best fit'
  weekday?: 'narrow' | 'short' | 'long'
  era?: 'narrow' | 'short' | 'long'
  year?: 'numeric' | '2-digit'
  month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long'
  day?: 'numeric' | '2-digit'
  hour?: 'numeric' | '2-digit'
  minute?: 'numeric' | '2-digit'
  second?: 'numeric' | '2-digit'
  timeZoneName?: 'short' | 'long'
  hour12?: boolean
  timeZone?: string
}
export const supportedLocales = {
  Afrikaans: 'af',
  Arabic: 'ar',
  Azerbaijani: 'az',
  Belarusian: 'be',
  Bulgarian: 'bg',
  Bengali: 'bn',
  Bosnian: 'bs',
  Catalan: 'ca',
  Czech: 'cs',
  Welsh: 'cy',
  Danish: 'da',
  German: 'de',
  Greek: 'el',
  English: 'en',
  Spanish: 'es',
  Estonian: 'et',
  Basque: 'eu',
  Persian: 'fa',
  Finnish: 'fi',
  French: 'fr',
  Irish: 'ga',
  Galician: 'gl',
  Gujarati: 'gu',
  Hebrew: 'he',
  Hindi: 'hi',
  Croatian: 'hr',
  Hungarian: 'hu',
  Armenian: 'hy',
  Indonesian: 'id',
  Icelandic: 'is',
  Italian: 'it',
  Japanese: 'ja',
  Georgian: 'ka',
  Kazakh: 'kk',
  Khmer: 'km',
  Kannada: 'kn',
  Korean: 'ko',
  Kyrgyz: 'ky',
  Lao: 'lo',
  Lithuanian: 'lt',
  Latvian: 'lv',
  Macedonian: 'mk',
  Malayalam: 'ml',
  Mongolian: 'mn',
  Marathi: 'mr',
  Malay: 'ms',
  Burmese: 'my',
  'Norwegian Bokmål': 'nb',
  Nepali: 'ne',
  Dutch: 'nl',
  'Norwegian Nynorsk': 'nn',
  Odia: 'or',
  Punjabi: 'pa',
  Polish: 'pl',
  Pashto: 'ps',
  Portuguese: 'pt',
  Romanian: 'ro',
  Russian: 'ru',
  Sinhala: 'si',
  Slovak: 'sk',
  Slovenian: 'sl',
  Albanian: 'sq',
  Serbian: 'sr',
  Swedish: 'sv',
  Swahili: 'sw',
  Tamil: 'ta',
  Telugu: 'te',
  Thai: 'th',
  Turkish: 'tr',
  Ukrainian: 'uk',
  Urdu: 'ur',
  Uzbek: 'uz',
  Vietnamese: 'vi',
  Chinese: 'zh'
}
export const commonlyUsedTimezones = {
  UTC: 'UTC',
  GMT: 'GMT',
  'Eastern Standard Time': 'America/New_York',
  'Pacific Standard Time': 'America/Los_Angeles',
  'British Summer Time': 'Europe/London',
  'Central European Time': 'Europe/Berlin',
  'Japan Standard Time': 'Asia/Tokyo',
  'Australian Eastern Standard Time': 'Australia/Sydney',
  'South Africa Standard Time': 'Africa/Johannesburg',
  'New Zealand Standard Time': 'Pacific/Auckland'
}
export const getFormatter = (locale: string) => {
  return new Intl.DateTimeFormat(locale, {})
}

// const usTime = getFormatter('en-US).formate(new Date())
