/**
 * Componente de sidebar de la aplicación
 *
 * @param {React.ComponentProps<typeof Sidebar>} props - Propiedades del componente
 * @returns {JSX.Element} Componente de sidebar de la aplicación
 */

'use client'

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from '@/components/ui/sidebar'

// Import of components custom
import {
  Header,
  NavMain,
  NavUser,
} from '@/components/atomic-design/organism/navigation/sidebar/fragments'

// Import of utilities
import { SidebarItem } from '../utils'


interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  items: SidebarItem[]
}

export function AppSidebar({ ...props }: Readonly<AppSidebarProps>) {

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Header />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={[]} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: '', email: '', avatar: '' }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
