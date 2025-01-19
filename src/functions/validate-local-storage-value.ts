import { ValidLocalStorageObject } from '@jenesei-software/jenesei-ui-react/context-local-storage'

export const validateLocalStorageKeys: (keyof ValidLocalStorageObject)[] = []

export function getValidateLocalStorageValue<K extends keyof ValidLocalStorageObject>(
  key: K,
  value: ValidLocalStorageObject[K]
): value is ValidLocalStorageObject[K] {
  console.log('value', value)
  switch (key) {
    default:
      return true
  }
}
