/**
 * Componente de header de la sidebar
 *
 * @module components/atomic-design/organism/navigation/sidebar/fragments/header
 */

import { HandCoinsIcon } from 'lucide-react'
import Link from 'next/link'

// Import of utilities
import {
  useSidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'

export const Header = () => {
  // Hooks
  const { state } = useSidebar()

  // Logo
  const logoCtrlCash = state === 'expanded'
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="relative hover:bg-transparent active:bg-transparent"
          asChild
        >
          <div className="flex items-center justify-center">
            <Link
              href="/"
              className="font-title flex items-center gap-2 text-xl font-bold text-white"
            >
              <HandCoinsIcon className="size-6" />
              {logoCtrlCash && <span>CtrlCash</span>}
            </Link>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
