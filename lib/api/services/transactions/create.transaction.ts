/**
 * Crear una nueva transacción
 *
 * @module lib/api/services/transactions/create.transaction
 */

import { API_CONFIG } from '../../config'
import { handleResponse } from '../api-error'
import type { Transaction, TransactionInput } from '../../types'

/**
 * Crear una nueva transacción
 *
 * @param input - Datos de la transacción
 * @returns Transacción creada
 * @throws {ApiError} Si la creación falla
 */
export async function createTransaction(
  input: TransactionInput
): Promise<Transaction> {
  const response = await fetch(API_CONFIG.mockapi.endpoints.transactions, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })

  return handleResponse<Transaction>(response)
}

