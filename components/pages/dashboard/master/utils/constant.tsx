/**
 * @file constant.ts
 * @description Constantes de la página maestra
 * @module components/pages/master/utils/constant
 */

import { Package, UserCog } from 'lucide-react'

// Import of utilities
import { ROUTES_PAGES, KEYWORDS } from '@/config'

export type MasterCardItem = {
  icon: React.ReactNode
  name: string
  detail: string
  link: string
}

export const MASTER_CARD_LIST: MasterCardItem[] = [
  {
    icon: <Package />,
    name: KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.MASTER.PRODUCTS,
    detail:
      'Comprehensive management and administration of all product accounts, including product creation, modification, and access control.',

    link: ROUTES_PAGES.MASTER.PRODUCTS.LIST,
  },
  {
    icon: <UserCog />,
    name: KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.MASTER.USERS,
    detail:
      'Comprehensive management and administration of all user accounts, including user creation, modification, and access control.',

    link: ROUTES_PAGES.MASTER.USERS.LIST,
  },
]
