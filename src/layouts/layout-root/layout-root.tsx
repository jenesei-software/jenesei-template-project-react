import { ProviderApp, Typography } from '@jenesei-software/jenesei-ui-react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { ProviderLanguage } from '@local/contexts/context-language'
import { useEnvironment } from '@local/hooks/use-environment'

export function LayoutRoot() {
  const { title, description, mode } = useEnvironment()

  return (
    <>
      <ProviderApp
        defaultTitle={title}
        defaultBgColor="whiteStandard"
        defaultStatusBarColor="whiteStandard"
        defaultDescription={description}
        isScrollOutlet={true}
      >
        <ProviderLanguage>
          <Outlet />
        </ProviderLanguage>
      </ProviderApp>
      {(mode === 'dev' || mode == 'test') && (
        <>
          <ReactQueryDevtools buttonPosition="bottom-left" />
          <TanStackRouterDevtools position="bottom-right" />
        </>
      )}
    </>
  )
}
