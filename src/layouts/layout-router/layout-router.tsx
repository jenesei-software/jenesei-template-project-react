import { useCookie } from '@jenesei-software/jenesei-ui-react'
import { RouterProvider } from '@tanstack/react-router'
import { useEffect, useMemo } from 'react'

import { queryClient } from '@local/core/query'
import { router } from '@local/core/router'

export function LayoutRouter() {
  const { cookieValues } = useCookie()
  const isAuthenticated = useMemo(() => !!cookieValues?.auth_status, [cookieValues?.auth_status])

  useEffect(() => {
    router.invalidate()
  }, [isAuthenticated])

  return (
    <RouterProvider
      router={router}
      context={{ queryClient, cookieValues, auth: { isAuthenticated: isAuthenticated } }}
    />
  )
}
