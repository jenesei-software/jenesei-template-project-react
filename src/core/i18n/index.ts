import { KeysLanguage } from '@jenesei-software/jenesei-ui-react/consts'
import { ILanguageKeys } from '@jenesei-software/jenesei-ui-react/types'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-chained-backend'
import HttpApi from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

const mode = import.meta.env.VITE_NODE_ENV

export const defaultNS: INameSpace = 'translation'
export const fallbackLng = KeysLanguage.ru as ILanguageKeys
export const supportedLngs = Object.values(KeysLanguage) as ILanguageKeys[]
export const browserLng = navigator.language.split('-')[0]

export type INameSpace = 'translation'

export interface IResources {
  test: string
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    load: 'languageOnly',
    defaultNS,
    backend: {
      backends: [HttpApi],
      backendOptions: [
        {
          prefix: 'i18next_res_',
          loadPath: '/locales/{{lng}}/{{ns}}.json'
        }
      ]
    },
    supportedLngs: supportedLngs,
    fallbackLng: fallbackLng,
    debug: mode !== 'prod',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: true
    }
  })

export { i18n }
