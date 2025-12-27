/**
 * Hook para eliminar una transacción
 * Mutation porque modifica datos
 *
 * @module lib/api/hooks/transactions/use-delete-transaction
 */

'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { transactionService } from '../../services'
import { queryKeys } from '../query-keys'

/**
 * Hook para eliminar una transacción
 * Invalida automáticamente las queries relacionadas al tener éxito
 *
 * @returns Mutation para eliminar transacción
 */
export function useDeleteTransaction() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: transactionService.delete,
    onSuccess: () => {
      // Invalidar queries de transacciones
      queryClient.invalidateQueries({
        queryKey: queryKeys.transactions.lists(),
      })
      // Invalidar resumen del dashboard
      const userId =
        (globalThis.window !== undefined
          ? globalThis.localStorage.getItem('userId')
          : null) || '1'
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.summary(userId),
      })
    },
  })
}

