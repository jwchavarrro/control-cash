/**
 * Obtener todos los usuarios
 *
 * @module lib/api/services/users/get-all.users
 */

import { API_CONFIG } from '@/lib/api/config'
import { handleResponse } from '@/lib/api/services/api-error'
import type { User } from '@/lib/api/types'

/**
 * Obtener todos los usuarios
 *
 * @returns Array de usuarios
 * @throws {ApiError} Si la petición falla
 */
export async function getAllUsers(): Promise<User[]> {
  const response = await fetch(API_CONFIG.mockapi.endpoints.users, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return handleResponse<User[]>(response)
}
