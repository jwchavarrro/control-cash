/**
 * Obtener una transacción por ID
 *
 * @module lib/api/services/transactions/get-by-id.transaction
 */

import { API_CONFIG } from '@/lib/api/config'
import { handleResponse } from '@/lib/api/services/api-error'
import type { Transaction } from '@/lib/api/types'

/**
 * Obtener una transacción por ID
 *
 * @param id - ID de la transacción
 * @returns Transacción encontrada
 * @throws {ApiError} Si la transacción no existe o falla la petición
 */
export async function getTransactionById(id: string): Promise<Transaction> {
  const response = await fetch(
    `${API_CONFIG.mockapi.endpoints.transactions}/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  return handleResponse<Transaction>(response)
}
