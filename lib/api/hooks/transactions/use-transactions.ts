/**
 * Hook para obtener todas las transacciones
 * Query porque solo lee datos
 *
 * @module lib/api/hooks/transactions/use-transactions
 */

'use client'

import { useQuery } from '@tanstack/react-query'
import { transactionService } from '@/lib/api/services'
import { queryKeys } from '@/lib/api/hooks/query-keys'
import type { Transaction, TransactionFilters } from '@/lib/api/types'

/**
 * Hook para obtener todas las transacciones
 *
 * @param filters - Filtros opcionales para las transacciones
 * @param enabled - Si la query debe ejecutarse (útil para dependencias)
 * @returns Query con las transacciones
 */
export function useTransactions(filters?: TransactionFilters, enabled = true) {
  return useQuery<Transaction[], Error>({
    queryKey: queryKeys.transactions.list(filters),
    queryFn: () => transactionService.getAll(filters),
    enabled,
    staleTime: 30 * 1000, // 30 segundos
  })
}

