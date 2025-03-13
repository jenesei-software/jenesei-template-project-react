import '@jenesei-software/jenesei-id-web-api'
import { ErrorResponse } from '@jenesei-software/jenesei-id-web-api'
import '@tanstack/react-query'
import { AxiosError } from 'axios'

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<ErrorResponse>
  }
}
