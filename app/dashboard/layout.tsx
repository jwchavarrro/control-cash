/**
 * @file dashboard.layout.tsx
 * @description Layout del dashboard
 * @module app/dashboard/layout
 */

'use client'

// Import of components custom
import { AuthCheck } from '@/components/auth/auth-check'
import { Sidebar } from '@/components/atomic-design/organism'

// Import of utilities
import { NAVIGATION_NAV_MAIN } from '@/components/pages/dashboard'

// Import of hooks
import { useSession } from '@/hooks'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({
  children,
}: Readonly<DashboardLayoutProps>) {
  const { name, email } = useSession()
  return (
    <AuthCheck>
      <Sidebar
        items={NAVIGATION_NAV_MAIN.NAV_MAIN}
        user={{
          name: name || '',
          email: email || '',
          avatar: 'https://github.com/shadcn.png',
        }}
      >
        {children}
      </Sidebar>
    </AuthCheck>
  )
}
