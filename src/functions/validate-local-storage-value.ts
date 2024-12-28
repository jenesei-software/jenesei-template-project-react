import { ILanguageKeys, KeysLanguage, ValidLocalStorageObject } from '@jenesei-software/jenesei-ui-react'

export const validateLocalStorageKeys: (keyof ValidLocalStorageObject)[] = ['i18nextLng']

export function getValidateLocalStorageValue<K extends keyof ValidLocalStorageObject>(
  key: K,
  value: ValidLocalStorageObject[K]
): value is ValidLocalStorageObject[K] {
  switch (key) {
    case 'i18nextLng':
      console.log('getValidateLocalStorageValue', value, key)
      return Object.values(KeysLanguage).includes(value as ILanguageKeys)
    default:
      return true
  }
}
