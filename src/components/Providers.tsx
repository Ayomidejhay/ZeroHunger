'use client';

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
        {/* Optional: React Query Devtools for development */}
        {process.env.NODE_ENV === 'development'}
      </QueryClientProvider>
  )
}

export default Providers