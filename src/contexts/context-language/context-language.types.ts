import { ILanguageKeys } from '@jenesei-software/jenesei-ui-react'
import { PropsWithChildren } from 'react'

export type ProviderLanguageProps = PropsWithChildren

export interface LanguageContextProps {
  lng: ILanguageKeys
  fallbackLng: ILanguageKeys
  supportedLngs: ILanguageKeys[]
  browserLng: string
  isError: boolean
  changeLng: (lng: ILanguageKeys) => void
}
