/**
 * @file constants.ts
 * @description Constantes de la navegación
 * @module components/pages/dashboard/utils/constants
 */

import { ArrowRightLeft,LayoutDashboard, Birdhouse } from 'lucide-react'

// Import of utilities
import { KEYWORDS, ROUTES_PAGES } from '@/config'

/**
 * @constant NAVIGATION_NAV_MAIN
 * @description Navegación del sidebar
 */
export const NAVIGATION_NAV_MAIN = {
  NAV_MAIN: [
    {
      title: KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.DASHBOARD.TITLE,
      url: ROUTES_PAGES.DASHBOARD,
      icon: Birdhouse,
    },
    {
      title: KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.MASTER.TITLE,
      url: ROUTES_PAGES.MASTER.MASTER,
      icon: LayoutDashboard,
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
      icon: ArrowRightLeft,
    },
  ],
}
