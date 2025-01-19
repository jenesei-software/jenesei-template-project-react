import '@jenesei-software/jenesei-ui-react'
import 'styled-components'

declare module '@jenesei-software/jenesei-ui-react' {
  export interface ValidCookieObject {
    auth_status: boolean
  }
}
