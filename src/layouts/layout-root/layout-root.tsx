import { ProviderApp, useRemovePreviewLoader } from '@jenesei-software/jenesei-ui-react'
import { useGetSSOAuthProfile } from '@jenesei-software/jenesei-web-id-api'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useMemo } from 'react'

import { ProviderLanguage } from '@local/contexts/context-language'
import { useEnvironment } from '@local/hooks/use-environment'

export function LayoutRoot() {
  useRemovePreviewLoader()

  const { title, description, mode } = useEnvironment()

  const { isLoading } = useGetSSOAuthProfile({ retry: false })

  const visible = useMemo(() => !!isLoading, [isLoading])

  return (
    <>
      <ProviderApp
        defaultPreview={{ visible: visible }}
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
