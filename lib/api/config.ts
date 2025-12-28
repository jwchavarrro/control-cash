/**
 * Configuración de APIs
 * URLs base para MockAPI
 *
 * @module lib/api/config
 */

const MOCKAPI_URL = process.env.NEXT_PUBLIC_MOCKAPI_URL || ''

if (!MOCKAPI_URL) {
  console.warn('⚠️ NEXT_PUBLIC_MOCKAPI_URL no está configurada')
}

export const API_CONFIG = {
  /**
   * @name mockapi
   * @description Configuración de MockAPI para transacciones y usuarios
   */
  mockapi: {
    baseUrl: MOCKAPI_URL,
    endpoints: {
      transactions: `${MOCKAPI_URL}/transactions`,
      users: `${MOCKAPI_URL}/users`,
    },
  },
} as const
