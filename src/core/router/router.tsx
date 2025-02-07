import { QueryClient } from '@tanstack/react-query'
import { Navigate, createRootRouteWithContext, createRoute, createRouter, redirect } from '@tanstack/react-router'

import { LayoutErrorRouter } from '@local/layouts/layout-error'
import { LayoutPrivate } from '@local/layouts/layout-private'
import { LayoutPublic } from '@local/layouts/layout-public'
import { LayoutRoot } from '@local/layouts/layout-root'
import { PagePrivateHome } from '@local/pages/private/home'
import { PagePublicHome } from '@local/pages/public/home'

import { validateLayoutRootRouteSearch } from '.'

export interface IContext {
  queryClient: QueryClient
  auth: { isAuthenticated: boolean | undefined }
}

export const LayoutRootRoute = createRootRouteWithContext<IContext>()({
  component: LayoutRoot,
  validateSearch: validateLayoutRootRouteSearch,
  errorComponent: LayoutErrorRouter,
  notFoundComponent: () => <Navigate to="/pu" />,
  beforeLoad: props => {
    const isPublic = !!props.matches.find(match => match.id === '/pu')
    const isPrivate = !!props.matches.find(match => match.id === '/pr')

    const isAuthenticated = props.context.auth.isAuthenticated

    if (isAuthenticated !== undefined)
      if (isAuthenticated) {
        if (isPublic)
          throw redirect({
            to: '/pr'
          })
      } else {
        if (isPrivate)
          throw redirect({
            to: '/pu'
          })
      }
  }
})

export const LayoutPrivateRoute = createRoute({
  getParentRoute: () => LayoutRootRoute,
  component: LayoutPrivate,
  notFoundComponent: () => <Navigate to="/pr/home" />,
  path: '/pr',
  beforeLoad: props => {
    const isFirst = props.location.pathname == '/pr'
    if (isFirst)
      throw redirect({
        to: '/pr/home'
      })
  }
})

export const LayoutPublicRoute = createRoute({
  getParentRoute: () => LayoutRootRoute,
  component: LayoutPublic,
  notFoundComponent: () => <Navigate to="/pu/home" />,
  path: 'pu',
  beforeLoad: props => {
    const isFirst = props.location.pathname == '/pu'
    if (isFirst)
      throw redirect({
        to: '/pu/home'
      })
  }
})

export const PagePrivateHomeRoute = createRoute({
  getParentRoute: () => LayoutPrivateRoute,
  component: PagePrivateHome,
  path: '/home'
})

export const PagePagePublicHome = createRoute({
  getParentRoute: () => LayoutPublicRoute,
  component: PagePublicHome,
  path: '/home'
})

const routeTree = LayoutRootRoute.addChildren({
  LayoutPublicRoute: LayoutPublicRoute.addChildren({
    PagePagePublicHome
  }),
  LayoutPrivateRoute: LayoutPrivateRoute.addChildren({
    PagePrivateHomeRoute
  })
})

export const router = createRouter({
  routeTree: routeTree,
  context: {
    queryClient: undefined!,
    auth: undefined!
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
