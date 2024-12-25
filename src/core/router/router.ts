import { ValidCookieObject } from '@jenesei-software/jenesei-ui-react'
import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, createRoute, createRouter, redirect } from '@tanstack/react-router'

import { LayoutAuthorization, LayoutAuthorizationNotFound } from '@local/layouts/layout-authorization'
import { LayoutRoot } from '@local/layouts/layout-root'
import { LayoutUser, LayoutUserNotFound } from '@local/layouts/layout-user'
import { UserProfile } from '@local/pages/user-profile'

import { validateLayoutRootRouteSearch } from '.'

export interface IContext {
  queryClient: QueryClient
  cookieValues: ValidCookieObject
  auth: { isAuthenticated: boolean }
}

export const LayoutRootRoute = createRootRouteWithContext<IContext>()({
  component: LayoutRoot,
  validateSearch: validateLayoutRootRouteSearch
})

export const LayoutUserRoute = createRoute({
  getParentRoute: () => LayoutRootRoute,
  component: LayoutUser,
  notFoundComponent: LayoutUserNotFound,
  path: '/user',
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/auth'
      })
    }
  }
})

export const UserProfileRoute = createRoute({
  getParentRoute: () => LayoutUserRoute,
  component: UserProfile,
  path: '/profile'
})

export const LayoutAuthorizationRoute = createRoute({
  getParentRoute: () => LayoutRootRoute,
  component: LayoutAuthorization,
  notFoundComponent: LayoutAuthorizationNotFound,
  path: '/auth',
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/auth'
      })
    }
  }
})

const routeTree = LayoutRootRoute.addChildren({
  LayoutAuthorizationRoute: LayoutAuthorizationRoute,
  LayoutUserRoute: LayoutUserRoute.addChildren({
    UserProfileRoute
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
