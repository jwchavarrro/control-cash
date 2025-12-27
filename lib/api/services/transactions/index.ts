/**
 * Servicio de Transacciones - Exportaciones
 * Agrupa todos los métodos del servicio de transacciones
 *
 * @module lib/api/services/transactions
 */

import { getAllTransactions } from './get-all.transaction'
import { getTransactionById } from './get-by-id.transaction'
import { createTransaction } from './create.transaction'
import { updateTransaction } from './update.transaction'
import { deleteTransaction } from './delete.transaction'

/**
 * Servicio completo de transacciones
 * Expone todos los métodos para operaciones CRUD
 */
export const transactionService = {
  getAll: getAllTransactions,
  getById: getTransactionById,
  create: createTransaction,
  update: updateTransaction,
  delete: deleteTransaction,
}

