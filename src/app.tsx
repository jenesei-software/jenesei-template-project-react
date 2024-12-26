import {
  JeneseiGlobalStyles,
  JeneseiTheme,
  ProviderCookie,
  ProviderPermission,
  ProviderScreenWidth,
  useRemovePreviewLoader
} from '@jenesei-software/jenesei-ui-react'
import { QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import { ThemeProvider } from 'styled-components'

import { i18n } from '@local/assets/i18n'
import { ProviderLanguage } from '@local/contexts/context-language'
import { queryClient } from '@local/core/query'
import { getValidateCookieValue, validateCookieKeys } from '@local/functions/validate-cookie-value'
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

// const baseURL = import.meta.env.VITE_BASE_URL || ''
// const coreURL = import.meta.env.VITE_CORE_URL || ''
// const availabilityCookieName = import.meta.env.VITE_AVAILABILITY_COOKIE_NAME || ''

function App() {
  useRemovePreviewLoader()

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={JeneseiTheme}>
          <JeneseiGlobalStyles />
          <ProviderScreenWidth>
            {/* <ProviderAxiosWebId coreURL={coreURL} baseURL={baseURL} availabilityCookieName={availabilityCookieName}> */}
            <ProviderCookie
              validate={{
                validateKeys: validateCookieKeys,
                getValidateCookieValue
              }}
            >
              <ProviderLanguage>
                <ProviderPermission serviceWorkerPath="/service-worker.js">
                  <LayoutRouter />
                </ProviderPermission>
              </ProviderLanguage>
            </ProviderCookie>
            {/* </ProviderAxiosWebId> */}
          </ProviderScreenWidth>
        </ThemeProvider>
      </I18nextProvider>
    </QueryClientProvider>
  )
}

export default App
