/**
 * Hook para actualizar una transacción
 * Mutation porque modifica datos
 *
 * @module lib/api/hooks/transactions/use-update-transaction
 */

'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { transactionService } from '../../services'
import { queryKeys } from '../query-keys'
import type { Transaction, TransactionInput } from '../../types'

/**
 * Hook para actualizar una transacción existente
 * Invalida automáticamente las queries relacionadas al tener éxito
 *
 * @returns Mutation para actualizar transacción
 */
export function useUpdateTransaction() {
  const queryClient = useQueryClient()

  return useMutation<
    Transaction,
    Error,
    { id: string; data: Partial<TransactionInput> }
  >({
    mutationFn: ({ id, data }) => transactionService.update(id, data),
    onSuccess: (data, variables) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({
        queryKey: queryKeys.transactions.detail(variables.id),
      })
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

