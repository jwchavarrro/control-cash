/**
 * Actualizar una transacción existente
 *
 * @module lib/api/services/transactions/update.transaction
 */

import { API_CONFIG } from '@/lib/api/config'
import { handleResponse } from '@/lib/api/services/api-error'
import type { Transaction, TransactionInput } from '@/lib/api/types'

/**
 * Actualizar una transacción existente
 *
 * @param id - ID de la transacción
 * @param input - Datos a actualizar (parciales)
 * @returns Transacción actualizada
 * @throws {ApiError} Si la actualización falla
 */
export async function updateTransaction(
  id: string,
  input: Partial<TransactionInput>
): Promise<Transaction> {
  const response = await fetch(
    `${API_CONFIG.mockapi.endpoints.transactions}/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    }
  )

  return handleResponse<Transaction>(response)
}
