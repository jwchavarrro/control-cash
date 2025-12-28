/**
 * Configuración de APIs
 * URLs base para MockAPI
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
} as const
