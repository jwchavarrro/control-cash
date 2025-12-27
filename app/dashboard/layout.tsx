/**
 * Layout de la dashboard
 *
 * @param {React.ReactNode} children - Componentes hijos
 * @returns {JSX.Element} Layout de la dashboard
 */

// Import of components custom
import { Sidebar } from '@/components/atomic-design/organism'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({
  children,
}: Readonly<DashboardLayoutProps>) {
  return <Sidebar>{children}</Sidebar>
}
