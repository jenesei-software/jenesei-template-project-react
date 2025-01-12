import { useGetSSOAuthProfile } from '@jenesei-software/jenesei-id-web-api'
import { RouterProvider } from '@tanstack/react-router'
import { useEffect, useMemo } from 'react'

import { queryClient } from '@local/core/query'
import { router } from '@local/core/router'

export function LayoutRouter() {
  const { isSuccess, isFetched } = useGetSSOAuthProfile({ retry: false })
  const isAuthenticated = useMemo(() => (isFetched ? isSuccess : undefined), [isFetched, isSuccess])
  useEffect(() => {
    router.invalidate()
  }, [isAuthenticated])

  return <RouterProvider router={router} context={{ queryClient, auth: { isAuthenticated: isAuthenticated } }} />
}
