/**
 * Query keys para React Query
 * Centraliza todas las keys para facilitar invalidación y organización
 *
 * @module lib/api/hooks/query-keys
 */

import type { TransactionFilters } from '@/lib/api/types'

export const queryKeys = {
  transactions: {
    all: ['transactions'] as const,
    lists: () => [...queryKeys.transactions.all, 'list'] as const,
    list: (filters?: TransactionFilters) =>
      [...queryKeys.transactions.lists(), filters] as const,
    details: () => [...queryKeys.transactions.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.transactions.details(), id] as const,
  },
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: () => [...queryKeys.users.lists()] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },
  dashboard: {
    summary: (userId: string) => ['dashboard', 'summary', userId] as const,
  },
} as const
