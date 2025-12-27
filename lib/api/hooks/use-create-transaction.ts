/**
 * Hook para crear una transacción
 * Mutation porque modifica datos
 *
 * @module lib/api/hooks/use-create-transaction
 */

'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { transactionService } from '../services'
import { queryKeys } from './query-keys'
import type { Transaction, TransactionInput } from '../types'

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
        (globalThis.window !== undefined
          ? globalThis.localStorage.getItem('userId')
          : null) || '1'
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.summary(userId),
      })
    },
  })
}

