/**
 * Layout de la dashboard
 * Protege todas las rutas del dashboard con autenticación
 *
 * @param {React.ReactNode} children - Componentes hijos
 * @returns {JSX.Element} Layout de la dashboard
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
      <Sidebar items={NAVIGATION_NAV_MAIN.NAV_MAIN}>{children}</Sidebar>
    </AuthCheck>
  )
}
