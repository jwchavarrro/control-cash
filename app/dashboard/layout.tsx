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

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({
  children,
}: Readonly<DashboardLayoutProps>) {
  return (
    <AuthCheck>
      <Sidebar
        items={NAVIGATION_NAV_MAIN.NAV_MAIN}
        user={{
          name: 'John Doe',
          email: 'john.doe@example.com',
          avatar: 'https://github.com/shadcn.png',
        }}
      >
        {children}
      </Sidebar>
    </AuthCheck>
  )
}
