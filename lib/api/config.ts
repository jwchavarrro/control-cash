/**
 * Configuración de APIs
 * URLs base para MockAPI y ReqRes
 *
 * @module lib/api/config
 */

const MOCKAPI_PROJECT_ID = process.env.NEXT_PUBLIC_MOCKAPI_PROJECT_ID || ''

if (!MOCKAPI_PROJECT_ID) {
  console.warn('⚠️ NEXT_PUBLIC_MOCKAPI_PROJECT_ID no está configurada')
}

export const API_CONFIG = {
  /**
   * @name mockapi
   * @description Configuración de MockAPI para transacciones y usuarios
   */
  mockapi: {
    baseUrl: `https://${MOCKAPI_PROJECT_ID}.mockapi.io/api/v1`,
    endpoints: {
      transactions: `https://${MOCKAPI_PROJECT_ID}.mockapi.io/api/v1/transactions`,
      users: `https://${MOCKAPI_PROJECT_ID}.mockapi.io/api/v1/users`,
    },
  },
  /**
   * @name reqres
   * @description Configuración de ReqRes para autenticación
   */
  reqres: {
    baseUrl: 'https://reqres.in/api',
    endpoints: {
      login: 'https://reqres.in/api/login',
      register: 'https://reqres.in/api/register',
      users: 'https://reqres.in/api/users',
    },
  },
} as const

