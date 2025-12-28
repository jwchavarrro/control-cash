/**
 * @file dashboard.page.tsx
 * @description Página del dashboard
 * @module app/dashboard/page
 */

// Import of components custom
import { Header } from '@/components/atomic-design/molecules'

// Import of utilities
import { KEYWORDS } from '@/config'

export default function DashboardPage() {
  return (
    <div className="container mx-auto flex flex-col gap-4">
      <Header
        title={KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.DASHBOARD.TITLE}
        text="Welcome to your dashboard, Juliana. We're glad to have you here!"
      />
    </div>
  )
}
