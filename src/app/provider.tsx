'use client';

import { FC, ReactNode, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface providerProps {
  children: ReactNode;
}
const client = new QueryClient();
const Provider: FC<providerProps> = ({ children }) => {
  return (
    <QueryClientProvider client={client}>
      <Suspense>{children}</Suspense>
    </QueryClientProvider>
  );
};

export default Provider;
