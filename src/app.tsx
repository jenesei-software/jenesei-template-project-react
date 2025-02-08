import { ProviderAxiosWebId } from '@jenesei-software/jenesei-id-web-api'
import { ProviderCookie } from '@jenesei-software/jenesei-ui-react/context-cookie'
import { ProviderLocalStorage } from '@jenesei-software/jenesei-ui-react/context-local-storage'
import { ProviderPermission } from '@jenesei-software/jenesei-ui-react/context-permission'
import { ProviderScreenWidth } from '@jenesei-software/jenesei-ui-react/context-screen-width'
import { JeneseiGlobalStyles, JeneseiTheme } from '@jenesei-software/jenesei-ui-react/style-theme'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components'

import { queryClient } from '@local/core/query'
import { getValidateCookieValue, validateCookieKeys } from '@local/functions/validate-cookie-value'
import { getValidateLocalStorageValue, validateLocalStorageKeys } from '@local/functions/validate-local-storage-value'
import { LayoutErrorBoundary } from '@local/layouts/layout-error'
import { LayoutRouter } from '@local/layouts/layout-router'

import '@fontsource/inter/100.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/900.css'
import '@fontsource/roboto/100.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto/900.css'

const baseURL = import.meta.env.VITE_BASE_URL || ''
const coreURL = import.meta.env.VITE_CORE_URL || ''
const availabilityCookieName = import.meta.env.VITE_AVAILABILITY_COOKIE_NAME || ''

function App() {
  return (
    <ThemeProvider theme={JeneseiTheme}>
      <JeneseiGlobalStyles />
      <LayoutErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ProviderScreenWidth>
            <ProviderAxiosWebId coreURL={coreURL} baseURL={baseURL} availabilityCookieName={availabilityCookieName}>
              <ProviderCookie
                validate={{
                  validateKeys: validateCookieKeys,
                  getValidateCookieValue
                }}
              >
                <ProviderLocalStorage
                  validate={{
                    validateKeys: validateLocalStorageKeys,
                    getValidateLocalStorageValue
                  }}
                >
                  <ProviderPermission>
                    <LayoutRouter />
                  </ProviderPermission>
                </ProviderLocalStorage>
              </ProviderCookie>
            </ProviderAxiosWebId>
          </ProviderScreenWidth>
        </QueryClientProvider>
      </LayoutErrorBoundary>
    </ThemeProvider>
  )
}

export default App
