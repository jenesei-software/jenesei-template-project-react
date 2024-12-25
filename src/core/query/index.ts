import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60000
    }
  }
})

export const queryKeys = {
  profile: {
    profile: 'profile'
  }
}
