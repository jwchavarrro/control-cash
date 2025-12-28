/**
 * @file dashboard.page.tsx
 * @description Página del dashboard
 * @module app/dashboard/page
 */

'use client'

// Import of components custom
import { Header } from '@/components/atomic-design/molecules'

// Import of utilities
import { KEYWORDS } from '@/config'

// Import of hooks
import { useSession } from '@/hooks'

export default function DashboardPage() {
  /**
   * @constant name
   * @description Nombre del usuario
   */
  const { name } = useSession()
  return (
    <div className="container mx-auto flex flex-col gap-4">
      <Header
        title={KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.DASHBOARD.TITLE}
        text={`Welcome to your dashboard, ${name}. We're glad to have you here!`}
      />
    </div>
  )
}
