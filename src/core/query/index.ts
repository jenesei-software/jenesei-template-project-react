import { env } from '@local/core/envs';
import { logger } from '@local/core/logger';

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: +env.queryStaleTime,
    },
    mutations: {
      onError: (error) => {
        if (error) {
          logger.error('queryClient, error:', error.response?.data);
        }
      },
    },
  },
});
