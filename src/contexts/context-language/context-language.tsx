import { ILanguageKeys, useCookie } from '@jenesei-software/jenesei-ui-react'
import { FC, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { I18nextProvider } from 'react-i18next'

import { browserLng, fallbackLng, i18n, supportedLngs } from '@local/core/i18n'

import { LanguageContextProps, ProviderLanguageProps } from '.'

const LanguageContext = createContext<LanguageContextProps | null>(null)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within an ProviderLanguage')
  }
  return context
}

export const ProviderLanguage: FC<ProviderLanguageProps> = props => {
  const { setCookie } = useCookie()

  const changeLng: LanguageContextProps['changeLng'] = useCallback(
    lng => {
      i18n.changeLanguage(lng)
      setCookie('lng', lng)
      setLocalLng(lng)
    },
    [setCookie]
  )
  const lng = useMemo(() => i18n.language as ILanguageKeys, [])
  const [localLng, setLocalLng] = useState<ILanguageKeys>(lng)

  const localFallbackLng = useMemo(() => fallbackLng, [])
  const localSupportedLngs = useMemo(() => supportedLngs, [])
  const localBrowserLng = useMemo(() => browserLng, [])

  useEffect(() => {
    setLocalLng(lng)
  }, [lng])

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageContext.Provider
        value={{
          fallbackLng: localFallbackLng,
          supportedLngs: localSupportedLngs,
          browserLng: localBrowserLng,
          lng: localLng,
          changeLng
        }}
      >
        {props.children}
      </LanguageContext.Provider>
    </I18nextProvider>
  )
}
