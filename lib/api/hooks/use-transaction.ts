/**
 * Hook para obtener una transacción por ID
 * Query porque solo lee datos
 *
 * @module lib/api/hooks/use-transaction
 */

'use client'

import { useQuery } from '@tanstack/react-query'
import { transactionService } from '../services'
import { queryKeys } from './query-keys'
import type { Transaction } from '../types'

/**
 * Hook para obtener una transacción por ID
 *
 * @param id - ID de la transacción
 * @param enabled - Si la query debe ejecutarse
 * @returns Query con la transacción
 */
export function useTransaction(id: string, enabled = true) {
  return useQuery<Transaction, Error>({
    queryKey: queryKeys.transactions.detail(id),
    queryFn: () => transactionService.getById(id),
    enabled: enabled && !!id,
  })
}



