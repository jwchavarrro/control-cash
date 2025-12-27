/**
 * Hook para obtener una transacción por ID
 * Query porque solo lee datos
 *
 * @module lib/api/hooks/transactions/use-transaction
 */

'use client'

import { useQuery } from '@tanstack/react-query'
import { transactionService } from '@/lib/api/services'
import { queryKeys } from '@/lib/api/hooks/query-keys'
import type { Transaction } from '@/lib/api/types'

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
