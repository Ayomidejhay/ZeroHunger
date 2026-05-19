'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

/**
 * ClientShell owns every client-side provider AND the layout chrome
 * (Header, Footer, Toaster) that depends on them.
 *
 * layout.tsx (Server Component) renders:
 *   <html><body><ClientShell>{page}</ClientShell></body></html>
 *
 * This guarantees Header/Footer are always inside AuthProvider, so
 * useAuth() never throws "must be used within an AuthProvider".
 */
export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 1000 * 60 * 5 },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Header />
        {children}
        <Toaster richColors position="top-right" />
        <Footer />
      </AuthProvider>
    </QueryClientProvider>
  );
}
