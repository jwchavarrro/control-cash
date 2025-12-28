/**
 * Componente de sidebar de la aplicación
 *
 * @module components/atomic-design/organism/navigation/sidebar
 */

'use client'

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'

// Import of components custom
import { AppSidebar } from '@/components/atomic-design/organism/navigation/sidebar/components'
import { Breadcrumbs } from '@/components/atomic-design/organism'

// Import of types
import {
  SidebarItem,
  SidebarUser,
} from '@/components/atomic-design/organism/navigation/sidebar/utils'

interface SidebarProps extends React.ComponentProps<typeof SidebarProvider> {
  items: SidebarItem[]
  user: SidebarUser
  children: React.ReactNode
}

export const Sidebar = ({ items, user, children }: SidebarProps) => {
  return (
    <SidebarProvider>
      <AppSidebar items={items} user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            {/* Breadcrumb */}
            <Breadcrumbs />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
