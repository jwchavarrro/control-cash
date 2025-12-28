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
      CREATE: '/dashboard/master/products/crear',
      EDIT: '/dashboard/master/products/editar/[id]',
      VIEW: '/dashboard/master/products/visualizar/[id]',
    },
    USERS: {
      LIST: '/dashboard/master/users',
      CREATE: '/dashboard/master/users/crear',
      EDIT: '/dashboard/master/users/editar/[id]',
      VIEW: '/dashboard/master/users/visualizar/[id]',
    },
  },
  TRANSACTIONS: {
    LIST: '/dashboard/transactions',
    CREATE: '/dashboard/transactions/crear',
    EDIT: '/dashboard/transactions/editar/[id]',
    VIEW: '/dashboard/transactions/visualizar/[id]',
  },
}
