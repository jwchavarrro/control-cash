/**
 * @file use-users.ts
 * @description Hook para obtener todos los usuarios
 * @module lib/api/hooks/users/use-users
 */

'use client'

import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/api/hooks/query-keys'
import { getAllUsers } from '@/lib/api/services/users'
import type { User } from '@/lib/api/types'

/**
 * Hook para obtener todos los usuarios
 *
 * @param enabled - Si la query debe ejecutarse (útil para dependencias)
 * @returns Query con los usuarios
 */
export function useUsers(enabled = true) {
  return useQuery<User[], Error>({
    queryKey: queryKeys.users.list(),
    queryFn: getAllUsers,
    enabled,
    staleTime: 30 * 1000, // 30 segundos
  })
}
