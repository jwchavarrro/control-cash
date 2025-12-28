/**
 * @file layout.tsx
 * @description Layout de la aplicación
 * @module app/layout
 */


import type { Metadata } from 'next'
import { QueryClientProvider } from '@/lib/query-client-provider'
import { Toaster } from '@/components/ui/sonner'

// Import of utilities
import './globals.css'

export const metadata: Metadata = {
  title: 'CtrlCash - Demo',
  description: 'CtrlCash is an expense and budget management application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryClientProvider>
          {children}
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  )
}
