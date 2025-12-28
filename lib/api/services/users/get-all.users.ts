/**
 * @file get-all.users.ts
 * @description Service to get all users
 * @module lib/api/services/users/get-all.users
 */

import { API_CONFIG } from '@/lib/api/config'
import { handleResponse } from '@/lib/api/services/api-error'

// Import of types
import type { User } from '@/lib/api/types'

export async function getAllUsers(): Promise<User[]> {
  const response = await fetch(API_CONFIG.mockapi.endpoints.users, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return handleResponse<User[]>(response)
}
