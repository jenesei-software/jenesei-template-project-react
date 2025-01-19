import '@jenesei-software/jenesei-ui-react/context-cookie'

declare module '@jenesei-software/jenesei-ui-react/context-cookie' {
  export interface ValidCookieObject {
    auth_status: boolean
  }
}
