import '@jenesei-software/jenesei-ui-react'
import { IJeneseiTheme, ILanguageKeys } from '@jenesei-software/jenesei-ui-react'
import 'styled-components'

declare module '@jenesei-software/jenesei-ui-react' {
  export interface ValidCookieObject {
    auth_status: boolean
    lng: ILanguageKeys
  }
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends IJeneseiTheme {}
}
