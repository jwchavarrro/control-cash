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
import { SidebarItem, SidebarUser } from '../utils'

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  items: SidebarItem[]
  user: SidebarUser
}

export function AppSidebar({ items, user }: Readonly<AppSidebarProps>) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Header />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
