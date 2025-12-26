/**
 * Hooks de React Query para consumir las APIs
 * Usa TanStack Query para manejo de estado, caché y sincronización
 *
 * @module lib/api/hooks
 */

'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authService, transactionService } from './services'
import type {
  Transaction,
  TransactionInput,
  TransactionFilters,
  LoginRequest,
  LoginResponse,
  DashboardSummary,
} from './types'

/**
 * Query keys para React Query
 */
export const queryKeys = {
  transactions: {
    all: ['transactions'] as const,
    lists: () => [...queryKeys.transactions.all, 'list'] as const,
    list: (filters?: TransactionFilters) =>
      [...queryKeys.transactions.lists(), filters] as const,
    details: () => [...queryKeys.transactions.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.transactions.details(), id] as const,
  },
  dashboard: {
    summary: (userId: string) => ['dashboard', 'summary', userId] as const,
  },
} as const

/**
 * Hook para login
 * Mutation porque modifica el estado (crea sesión)
 */
export function useLogin() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: authService.login,
    onSuccess: (data) => {
      // Guardar token en localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token)
        // Guardar userId por defecto (en producción vendría del response)
        localStorage.setItem('userId', '1')
      }
    },
  })
}

/**
 * Hook para registro
 * Mutation porque crea un nuevo usuario
 */
export function useRegister() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: authService.register,
    onSuccess: (data) => {
      // Guardar token en localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', '1')
      }
    },
  })
}

/**
 * Hook para obtener todas las transacciones
 * Query porque solo lee datos
 *
 * @param filters - Filtros opcionales para las transacciones
 * @param enabled - Si la query debe ejecutarse (útil para dependencias)
 */
export function useTransactions(
  filters?: TransactionFilters,
  enabled = true
) {
  return useQuery<Transaction[], Error>({
    queryKey: queryKeys.transactions.list(filters),
    queryFn: () => transactionService.getAll(filters),
    enabled,
    staleTime: 30 * 1000, // 30 segundos
  })
}

/**
 * Hook para obtener una transacción por ID
 * Query porque solo lee datos
 *
 * @param id - ID de la transacción
 * @param enabled - Si la query debe ejecutarse
 */
export function useTransaction(id: string, enabled = true) {
  return useQuery<Transaction, Error>({
    queryKey: queryKeys.transactions.detail(id),
    queryFn: () => transactionService.getById(id),
    enabled: enabled && !!id,
  })
}

/**
 * Hook para crear una transacción
 * Mutation porque modifica datos
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
      const userId = localStorage.getItem('userId') || '1'
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.summary(userId),
      })
    },
  })
}

/**
 * Hook para actualizar una transacción
 * Mutation porque modifica datos
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
      const userId = localStorage.getItem('userId') || '1'
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.summary(userId),
      })
    },
  })
}

/**
 * Hook para eliminar una transacción
 * Mutation porque modifica datos
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
      const userId = localStorage.getItem('userId') || '1'
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.summary(userId),
      })
    },
  })
}

/**
 * Hook para obtener resumen del dashboard
 * Query porque solo lee datos (calcula en el cliente)
 *
 * @param userId - ID del usuario
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
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0) || 0

      const totalExpenses =
        transactions
          .filter((t) => t.type === 'expense')
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

