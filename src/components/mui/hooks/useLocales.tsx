import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { deDE, enUS, frFR } from '@mui/material/locale'
import Cookies from 'js-cookie'
import { KEYS } from '@/config'
import en from '@/assets/flag_en.svg'
import fr from '@/assets/flag_fr.svg'
import de from '@/assets/flag_de.svg'

const LANGS = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: en
  },
  {
    label: 'German',
    value: 'de',
    systemValue: deDE,
    icon: de
  },
  {
    label: 'French',
    value: 'fr',
    systemValue: frFR,
    icon: fr
  }
]
export function useLocales() {
  const { i18n, t: translate } = useTranslation()
  const currentLang = LANGS.find(_lang => _lang.value === i18n.language)!

  useEffect(() => {
    const lang = Cookies.get(KEYS.lang)
    if (lang) {
      i18n.changeLanguage(lang)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeLanguage = useCallback(
    (newlang: string) => {
      i18n.changeLanguage(newlang)
      Cookies.set(KEYS.lang, newlang, { sameSite: 'strict', secure: true, expires: 32235323353 })
    },
    [i18n]
  )

  return { handleChangeLanguage, currentLang: currentLang, translate, allLang: LANGS }
}
