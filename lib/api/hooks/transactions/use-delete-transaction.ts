/**
 * @file use-delete-transaction.ts
 * @description Hook para eliminar una transacción
 * Mutation porque modifica datos
 *
 * @module lib/api/hooks/transactions/use-delete-transaction
 */

'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

// Import of custom hooks
import { transactionService } from '@/lib/api/services'
import { queryKeys } from '@/lib/api/hooks/query-keys'

export function useDeleteTransaction() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: transactionService.delete,
    onSuccess: () => {
      // Invalidar todas las queries de transacciones (incluye listas con filtros)
      queryClient.invalidateQueries({
        queryKey: queryKeys.transactions.all,
      })
      // Invalidar resumen del dashboard
      const userId =
        globalThis.window === undefined
          ? '1'
          : globalThis.localStorage.getItem('userId') || '1'
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.summary(userId),
      })
      // Refetch
      queryClient.refetchQueries({
        queryKey: queryKeys.transactions.all,
      })
      toast.success('Transaction deleted successfully')
    },
    onError: error => {
      toast.error(error?.message || 'Failed to delete transaction')
    },
  })
}
