/**
 * @file routes-pages.ts
 * @description Rutas de la aplicación
 * @module config/routes-pages
 */

export const ROUTES_PAGES = {
  DASHBOARD: '/dashboard',
  MASTER: {
    MASTER: '/dashboard/master',
    PRODUCTS: {
      LIST: '/dashboard/master/products',
      CREATE: '/dashboard/master/products/create',
      EDIT: '/dashboard/master/products/edit/[id]',
      VIEW: '/dashboard/master/products/view/[id]',
    },
    USERS: {
      LIST: '/dashboard/master/users',
      CREATE: '/dashboard/master/users/create',
      EDIT: '/dashboard/master/users/edit/[id]',
      VIEW: '/dashboard/master/users/view/[id]',
    },
  },
  TRANSACTIONS: {
    LIST: '/dashboard/transactions',
    CREATE: '/dashboard/transactions/create',
    EDIT: '/dashboard/transactions/edit/[id]',
    VIEW: '/dashboard/transactions/view/[id]',
  },
}
