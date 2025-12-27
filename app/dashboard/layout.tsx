/**
 * Layout de la dashboard
 *
 * @param {React.ReactNode} children - Componentes hijos
 * @returns {JSX.Element} Layout de la dashboard
 */

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({
  children,
}: Readonly<DashboardLayoutProps>) {
  return <div>{children}</div>
}
