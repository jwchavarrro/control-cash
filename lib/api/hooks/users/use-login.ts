/**
 * Hook para login
 * Mutation porque modifica el estado (crea sesión)
 *
 * @module lib/api/hooks/users/use-login
 */

'use client'

import { useMutation } from '@tanstack/react-query'
import { authService } from '@/lib/api/services'
import { saveSession } from '@/lib/auth'
import type { LoginRequest, LoginResponse } from '@/lib/api/types'

/**
 * Hook para iniciar sesión
 * Guarda el token en localStorage automáticamente al tener éxito
 *
 * @returns Mutation para login
 */
export function useLogin() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: authService.login,
    onSuccess: data => {
      // Guardar sesión usando función consolidada
      saveSession(data.token, '1') // userId por defecto
    },
  })
}
