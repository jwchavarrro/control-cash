/**
 * Hook para crear una transacción
 * Mutation porque modifica datos
 *
 * @module lib/api/hooks/transactions/use-create-transaction
 */

'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { transactionService } from '@/lib/api/services'
import { queryKeys } from '@/lib/api/hooks/query-keys'
import type { Transaction, TransactionInput } from '@/lib/api/types'

/**
 * Hook para crear una nueva transacción
 * Invalida automáticamente las queries relacionadas al tener éxito
 *
 * @returns Mutation para crear transacción
 */
export function useCreateTransaction() {
  const queryClient = useQueryClient()

  return useMutation<Transaction, Error, TransactionInput>({
    mutationFn: transactionService.create,
    onSuccess: () => {
      // Invalidar queries de transacciones para refrescar la lista
      queryClient.invalidateQueries({
        queryKey: queryKeys.transactions.lists(),
      })
      // Invalidar resumen del dashboard
      const userId =
        globalThis.window === undefined
          ? '1'
          : globalThis.localStorage.getItem('userId') || '1'
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.summary(userId),
      })
    },
  })
}
