/**
 * @file constants.ts
 * @description Constantes de la navegación
 * @module components/pages/dashboard/utils/constants
 */

import { SquareTerminal } from 'lucide-react'

// Import of utilities
import { KEYWORDS, ROUTES_PAGES } from '@/config'


export const NAVEGATION_NAV_MAIN = {
  navMain: [
    {
      title: KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.DASHBOARD,
      url: ROUTES_PAGES.DASHBOARD,
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.MASTER.PRODUCTS,
          url: ROUTES_PAGES.MASTER.PRODUCTS.LIST,
        },
        {
          title: KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.MASTER.TRANSACTIONS,
          url: ROUTES_PAGES.TRANSACTIONS.LIST,
        },
        {
          title: KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.MASTER.USERS,
          url: ROUTES_PAGES.MASTER.USERS.LIST,
        },
      ],
    },
  ],
}
