import { ILanguageKeys } from '@jenesei-software/jenesei-ui-react'
import { PropsWithChildren } from 'react'

export type ProviderLanguageProps = PropsWithChildren

export interface LanguageContextProps {
  lng: ILanguageKeys
  fallbackLng: ILanguageKeys
  supportedLngs: ILanguageKeys[]
  browserLng: string
  changeLng: (lng: ILanguageKeys) => void
}
