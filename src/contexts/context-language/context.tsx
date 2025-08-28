import { browserLng, fallbackLng, supportedLngs } from '@local/core/i18n';

import { ILanguageKeys } from '@jenesei-software/jenesei-kit-react/types';
import { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';

import { LanguageContextProps, ProviderLanguageProps } from '.';

const LanguageContext = createContext<LanguageContextProps | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within an ProviderLanguage');
  }
  return context;
};

export const ProviderLanguage: FC<ProviderLanguageProps> = (props) => {
  const { i18n } = useTranslation();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const changeLng: LanguageContextProps['changeLng'] = useCallback(
    (lng) => {
      setIsLoading(true);
      i18n
        .changeLanguage(lng)
        .then(() => {
          setIsError(false);
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [i18n],
  );

  const lng = useMemo(() => i18n.language as ILanguageKeys, [i18n.language]);
  const localFallbackLng = useMemo(() => fallbackLng, []);
  const localSupportedLngs = useMemo(() => supportedLngs, []);
  const localBrowserLng = useMemo(() => browserLng, []);

  useEffect(() => {
    document.documentElement.lang = lng;
  }, [lng]);

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageContext.Provider
        value={{
          fallbackLng: localFallbackLng,
          supportedLngs: localSupportedLngs,
          browserLng: localBrowserLng,
          lng,
          isError,
          isLoading,
          changeLng,
        }}
      >
        {props.children}
      </LanguageContext.Provider>
    </I18nextProvider>
  );
};
