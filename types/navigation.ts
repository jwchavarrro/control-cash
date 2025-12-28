/**
 * @file navigation.ts
 * @description Tipos relacionados con la navegación
 * @module types/navigation
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

