import { ILanguageKeys, KeysLanguage, getFromCookie } from '@jenesei-software/jenesei-ui-react'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './eng.json'
import ru from './ru.json'

const mode = import.meta.env.VITE_NODE_ENV

export const fallbackLng = KeysLanguage.ru as ILanguageKeys
export const supportedLngs = Object.values(KeysLanguage) as ILanguageKeys[]
export const browserLng = navigator.language.split('-')[0]
const defaultLng = getFromCookie('lng') as ILanguageKeys

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: supportedLngs,
    fallbackLng: fallbackLng,
    debug: mode !== 'prod',
    interpolation: {
      escapeValue: false
    },
    resources: {
      ru,
      en
    }
  })

const detectedLanguage = i18n.language || defaultLng || fallbackLng
i18n.changeLanguage(detectedLanguage)

export { i18n }
