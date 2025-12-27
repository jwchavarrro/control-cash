/**
 * Eliminar una transacción
 *
 * @module lib/api/services/transactions/delete.transaction
 */

import { API_CONFIG } from '../../config'
import { ApiError } from '../api-error'

/**
 * Eliminar una transacción
 *
 * @param id - ID de la transacción
 * @throws {ApiError} Si la eliminación falla
 */
export async function deleteTransaction(id: string): Promise<void> {
  const response = await fetch(
    `${API_CONFIG.mockapi.endpoints.transactions}/${id}`,
    {
      method: 'DELETE',
    }
  )

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new ApiError(
      errorData.error || `Error ${response.status}: ${response.statusText}`,
      response.status,
      errorData
    )
  }
}

