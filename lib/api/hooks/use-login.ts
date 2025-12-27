/**
 * Hook para login
 * Mutation porque modifica el estado (crea sesión)
 *
 * @module lib/api/hooks/use-login
 */

'use client'

import { useMutation } from '@tanstack/react-query'
import { authService } from '../services'
import type { LoginRequest, LoginResponse } from '../types'

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
      // Guardar token en localStorage
      if (globalThis.window !== undefined) {
        globalThis.localStorage.setItem('token', data.token)
        // Guardar userId por defecto (en producción vendría del response)
        globalThis.localStorage.setItem('userId', '1')
      }
    },
  })
}
