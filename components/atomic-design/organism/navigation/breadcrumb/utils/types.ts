/**
 * @file types.ts
 * @description Tipos para el componente Breadcrumb
 * @module components/atomic-design/organism/navigation/breadcrumb/utils/types
 */

export interface BreadcrumbItem {
  label: string
  href: string
  id: string
  active?: boolean
  disabled?: boolean
}

export interface NavItem {
  title: string
  url?: string
  href?: string
  icon?: React.ComponentType
  isActive?: boolean
  items?: NavItem[]
}
