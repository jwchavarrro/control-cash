/**
 * Hook para registro
 * Mutation porque crea un nuevo usuario
 *
 * @module lib/api/hooks/users/use-register
 */

'use client'

import { useMutation } from '@tanstack/react-query'
import { authService } from '@/lib/api/services'
import type { LoginRequest, LoginResponse } from '@/lib/api/types'

/**
 * Hook para registrar nuevo usuario
 * Guarda el token en localStorage automáticamente al tener éxito
 *
 * @returns Mutation para registro
 */
export function useRegister() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: authService.register,
    onSuccess: data => {
      // Guardar token en localStorage
      if (globalThis.window !== undefined) {
        globalThis.localStorage.setItem('token', data.token)
        globalThis.localStorage.setItem('userId', '1')
      }
    },
  })
}

