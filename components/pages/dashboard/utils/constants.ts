/**
 * @file constants.ts
 * @description Constantes de la navegación
 * @module components/pages/dashboard/utils/constants
 */

import { SquareTerminal } from 'lucide-react'

// Import of utilities
import { KEYWORDS, ROUTES_PAGES } from '@/config'

/**
 * @constant NAVIGATION_NAV_MAIN
 * @description Navegación del sidebar
 */
export const NAVIGATION_NAV_MAIN = {
  NAV_MAIN: [
    {
      title: KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.MASTER.TITLE,
      url: ROUTES_PAGES.DASHBOARD,
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.MASTER.PRODUCTS,
          url: ROUTES_PAGES.MASTER.PRODUCTS.LIST,
        },
        {
          title: KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.MASTER.USERS,
          url: ROUTES_PAGES.MASTER.USERS.LIST,
        },
      ],
    },
    {
      title: KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.TRANSACTIONS.TITLE,
      url: ROUTES_PAGES.TRANSACTIONS.LIST,
      icon: SquareTerminal,
      isActive: true,
    },
  ],
}
