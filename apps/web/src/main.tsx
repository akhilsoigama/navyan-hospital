import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SWRConfig } from 'swr'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import './index.css'
import App from './App.tsx'
import { axiosFetcher } from './lib/axios.ts'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000, // 30s
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Global SWR config — uses Axios fetcher by default */}
    <SWRConfig value={{ fetcher: axiosFetcher, revalidateOnFocus: false }}>
      {/* React Query provider (used by @tanstack/react-query hooks) */}
      <QueryClientProvider client={queryClient}>
        <App />
        {/* Sonner toast container */}
        <Toaster
          position="top-right"
          richColors
          expand={false}
          duration={4000}
          toastOptions={{
            style: {
              borderRadius: '1rem',
              fontFamily: 'inherit',
              fontSize: '0.8rem',
              fontWeight: '600',
            },
          }}
        />
      </QueryClientProvider>
    </SWRConfig>
  </StrictMode>
)
