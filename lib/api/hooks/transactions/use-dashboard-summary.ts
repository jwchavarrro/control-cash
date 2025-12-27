/**
 * Hook para obtener resumen del dashboard
 * Query porque solo lee datos (calcula en el cliente)
 *
 * @module lib/api/hooks/transactions/use-dashboard-summary
 */

'use client'

import { useQuery } from '@tanstack/react-query'
import { transactionService } from '@/lib/api/services'
import { queryKeys } from '@/lib/api/hooks/query-keys'
import type { DashboardSummary } from '@/lib/api/types'

/**
 * Hook para obtener resumen financiero del dashboard
 * Calcula ingresos totales, gastos totales y balance neto
 *
 * @param userId - ID del usuario
 * @returns Query con el resumen financiero
 */
export function useDashboardSummary(userId: string) {
  return useQuery<DashboardSummary, Error>({
    queryKey: queryKeys.dashboard.summary(userId),
    queryFn: async () => {
      // Obtener todas las transacciones del usuario
      const transactions = await transactionService.getAll({ userId })

      // Calcular resumen
      const totalIncome =
        transactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0) || 0

      const totalExpenses =
        transactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0) || 0

      const netBalance = totalIncome - totalExpenses

      return {
        totalIncome,
        totalExpenses,
        netBalance,
      }
    },
    enabled: !!userId,
    staleTime: 30 * 1000, // 30 segundos
  })
}
