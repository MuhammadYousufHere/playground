import { ReactNode, useEffect } from 'react'
import { I18nextProvider, useTranslation } from 'react-i18next'
import i18 from '@/locales/i18next'
import { useAppSelector } from '@/features/store'
import { selectLang } from '@/features/Setting/settingSlice'

export default function I188Provider({ children }: { children: ReactNode }) {
  const {
    i18n: { changeLanguage }
  } = useTranslation()
  const lang = useAppSelector(selectLang)
  useEffect(() => {
    if (lang) {
      changeLanguage(lang)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <I18nextProvider i18n={i18}>{children}</I18nextProvider>
}
