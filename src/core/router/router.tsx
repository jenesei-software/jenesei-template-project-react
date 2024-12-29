import { ValidCookieObject } from '@jenesei-software/jenesei-ui-react'
import { QueryClient } from '@tanstack/react-query'
import { Navigate, createRootRouteWithContext, createRoute, createRouter, redirect } from '@tanstack/react-router'

import { LayoutPrivate } from '@local/layouts/layout-private'
import { LayoutPublic } from '@local/layouts/layout-public'
import { LayoutRoot } from '@local/layouts/layout-root'
import { PagePrivateHome } from '@local/pages/private/home'
import { PagePublicHome } from '@local/pages/public/home'

import { validateLayoutRootRouteSearch } from '.'

export interface IContext {
  queryClient: QueryClient
  cookieValues: ValidCookieObject
  auth: { isAuthenticated: boolean }
}

export const LayoutRootRoute = createRootRouteWithContext<IContext>()({
  component: LayoutRoot,
  validateSearch: validateLayoutRootRouteSearch,
  notFoundComponent: () => <Navigate to="/public" />
})

export const LayoutPrivateRoute = createRoute({
  getParentRoute: () => LayoutRootRoute,
  component: LayoutPrivate,
  notFoundComponent: () => <Navigate to="/private/home" />,
  path: '/private',
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/public'
      })
    }
  }
})

export const LayoutPublicRoute = createRoute({
  getParentRoute: () => LayoutRootRoute,
  component: LayoutPublic,
  notFoundComponent: () => <Navigate to="/public/home" />,
  path: '/public',
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: '/private'
      })
    }
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
    cookieValues: undefined!,
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
