/**
 * @file types.ts
 * @description Tipos de la aplicación
 * @module components/atomic-design/organism/navigation/sidebar/utils/types
 */

import { LucideIcon } from 'lucide-react'

export interface SidebarItem {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: SidebarItem[]
}

export interface SidebarUser {
  name: string
  email: string
  avatar: string
}
