/**
 * @file constant.ts
 * @description Constantes de la página maestra
 * @module components/pages/master/utils/constant
 */

import { Package, UserCog, type LucideIcon } from 'lucide-react'

// Import of utilities
import { KEYWORDS } from '@/config'



type MasterCardItem = {
  icon: LucideIcon
  name: string
  detail: string
}

export const masterCardList: MasterCardItem[] = [
  {
    icon: Package,
    name: KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.MASTER.PRODUCTS,
    detail:
      'Comprehensive management and administration of all product accounts, including product creation, modification, and access control.',
  },
  {
    icon: UserCog,
    name: KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.MASTER.USERS,
    detail:
      'Comprehensive management and administration of all user accounts, including user creation, modification, and access control.',
  },
]
