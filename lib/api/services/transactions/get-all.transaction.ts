/**
 * Obtener todas las transacciones
 *
 * @module lib/api/services/transactions/get-all.transaction
 */

import { API_CONFIG } from '@/lib/api/config'
import { handleResponse } from '@/lib/api/services/api-error'
import type { Transaction, TransactionFilters } from '@/lib/api/types'

/**
 * Obtener todas las transacciones con filtros opcionales
 *
 * @param filters - Filtros opcionales (userId, type, category)
 * @returns Array de transacciones
 * @throws {ApiError} Si la petición falla
 */
export async function getAllTransactions(
  filters?: TransactionFilters
): Promise<Transaction[]> {
  const params = new URLSearchParams()

  if (filters?.userId) {
    params.append('userId', filters.userId)
  }
  if (filters?.type) {
    params.append('type', filters.type)
  }
  if (filters?.category) {
    params.append('category', filters.category)
  }

  const url = `${API_CONFIG.mockapi.endpoints.transactions}${
    params.toString() ? `?${params.toString()}` : ''
  }`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return handleResponse<Transaction[]>(response)
}
