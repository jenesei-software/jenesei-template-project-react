import { useSSOProfile } from '@jenesei-software/jenesei-id-web-api'
import { ProviderApp } from '@jenesei-software/jenesei-ui-react/context-app'
import { useScreenWidth } from '@jenesei-software/jenesei-ui-react/context-screen-width'
import { ProviderSonner } from '@jenesei-software/jenesei-ui-react/context-sonner'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet, useMatches, useNavigate } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useEffect, useMemo } from 'react'

import { ProviderValidation } from '@local/contexts/context-validation'
import { LayoutRoutePrivate, LayoutRoutePublic } from '@local/core/router'
import { useEnvironment } from '@local/hooks/use-environment'

export function LayoutRoot() {
  const env = useEnvironment()

  useEffect(() => {
    console.table(env)
  }, [env])

  return (
    <>
      <ProviderValidation>
        <LayoutRootComponent />
      </ProviderValidation>
      {env.mode === 'test' && (
        <>
          <ReactQueryDevtools buttonPosition="bottom-left" />
          <TanStackRouterDevtools position="bottom-right" />
        </>
      )}
    </>
  )
}

const LayoutRootComponent = () => {
  const { title } = useEnvironment()
  // const { t } = useTranslation('translation')
  const { isLoading, isSuccess, isFetched } = useSSOProfile()
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

  const { screenActual } = useScreenWidth()
  return (
    <ProviderSonner
      gap={12}
      position={screenActual === 'mobile' ? 'bottom-center' : 'bottom-right'}
      visibleToasts={3}
      zIndex={100}
      default={{
        genre: 'black',
        button: {
          content: 'Undo'
        }
      }}
    >
      <ProviderApp
        defaultPreview={{ visible: !visible, defaultVisible: false }}
        defaultTitle={title}
        defaultDescription={'defaultDescription'}
        isScrollOutlet={true}
        defaultBgColor="whiteStandard"
        defaultStatusBarColor="whiteStandard"
      >
        <LayoutURLComponent />
      </ProviderApp>
    </ProviderSonner>
  )
}
const LayoutURLComponent = () => {
  // const { title } = useEnvironment()
  // const { t: tURLTitle } = useTranslation('translation', { keyPrefix: 'url.title' })
  // const fullPath = useRouterState({
  //   select: state => state.location.pathname.replace(/\/$/, '')
  // })
  // const { changeTitle } = useApp()

  // useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const titleTranslate = tURLTitle(fullPath as any, { defaultValue: '__MISSING__' })
  //   const exists = titleTranslate !== '__MISSING__'
  //   if (exists) {
  //     changeTitle(titleTranslate)
  //   } else {
  //     changeTitle(title)
  //   }
  // }, [changeTitle, title, fullPath, tURLTitle])
  return <Outlet />
}
