'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/themeStore';

export function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((s) => s.theme);
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: { retry: 0 },
          queries: { retry: 0, refetchOnWindowFocus: false },
        },
      }),
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
