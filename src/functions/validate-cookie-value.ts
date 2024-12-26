import { ILanguageKeys, KeysLanguage, ValidCookieObject } from '@jenesei-software/jenesei-ui-react'

export const validateCookieKeys: (keyof ValidCookieObject)[] = ['auth_status', 'lng']

export function getValidateCookieValue<K extends keyof ValidCookieObject>(
  key: K,
  value: ValidCookieObject[K]
): value is ValidCookieObject[K] {
  switch (key) {
    case 'auth_status':
      return typeof value === 'boolean'
    case 'lng':
      return Object.values(KeysLanguage).includes(value as ILanguageKeys)
    default:
      return true
  }
}
