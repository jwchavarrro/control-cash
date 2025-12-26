import type { Metadata } from 'next'

// Import of utilities
import './globals.css'
import { QueryClientProvider } from '@/lib/query-client-provider'

export const metadata: Metadata = {
  title: 'Control Cash - Demo',
  description: 'Control Cash es una aplicación de control de gastos y presupuestos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  )
}
