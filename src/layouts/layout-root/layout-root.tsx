import { useGetSSOAuthProfile } from '@jenesei-software/jenesei-id-web-api'
import { useRemovePreviewLoader } from '@jenesei-software/jenesei-ui-react/area-preview'
import { ProviderApp } from '@jenesei-software/jenesei-ui-react/context-app'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet, useMatches, useNavigate } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useEffect, useMemo } from 'react'

import { ProviderLanguage } from '@local/contexts/context-language'
import { LayoutRoutePrivate, LayoutRoutePublic } from '@local/core/router'
import { useEnvironment } from '@local/hooks/use-environment'

export function LayoutRoot() {
  useRemovePreviewLoader()

  const { title, description, mode } = useEnvironment()

  const { isLoading, isSuccess, isFetched } = useGetSSOAuthProfile({ retry: false })
  const isAuthenticated = useMemo(() => (isFetched ? isSuccess : undefined), [isFetched, isSuccess])

  const visible = useMemo(() => !!isLoading, [isLoading])
  const navigate = useNavigate()

  const isMatchPrivate = useMatches({
    select(matches) {
      return matches.some(match => match.fullPath === LayoutRoutePrivate.fullPath)
    }
  })
  const isMatchPublic = useMatches({
    select(matches) {
      return matches.some(match => match.fullPath === LayoutRoutePublic.fullPath)
    }
  })

  useEffect(() => {
    if (isAuthenticated !== undefined) {
      if (isMatchPrivate) {
        if (!isAuthenticated) navigate({ to: '/pu' })
      } else if (isMatchPublic) {
        if (isAuthenticated) navigate({ to: '/pr' })
      }
    }
  }, [isAuthenticated, isMatchPrivate, isMatchPublic, navigate])
  return (
    <>
      <ProviderLanguage>
        <ProviderApp
          defaultPreview={{ visible: visible }}
          defaultTitle={title}
          defaultBgColor="whiteStandard"
          defaultStatusBarColor="whiteStandard"
          defaultDescription={description}
          isScrollOutlet={true}
        >
          <Outlet />
        </ProviderApp>
      </ProviderLanguage>
      {(mode === 'dev' || mode == 'test') && (
        <>
          <ReactQueryDevtools buttonPosition="bottom-left" />
          <TanStackRouterDevtools position="bottom-right" />
        </>
      )}
    </>
  )
}
