/**
 * Query keys para React Query
 * Centraliza todas las keys para facilitar invalidación y organización
 *
 * @module lib/api/hooks/query-keys
 */

import type { TransactionFilters } from '../types'

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
