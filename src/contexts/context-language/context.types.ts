import { ILanguageKeys } from '@jenesei-software/jenesei-kit-react/types';
import { PropsWithChildren } from 'react';

export type ProviderLanguageProps = PropsWithChildren;

export interface LanguageContextProps {
  browserLng: string;

  changeLng: (lng: ILanguageKeys) => void;

  fallbackLng: ILanguageKeys;

  isError: boolean;

  isLoading: boolean;

  lng: ILanguageKeys;

  supportedLngs: ILanguageKeys[];
}
