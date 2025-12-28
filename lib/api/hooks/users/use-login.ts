/**
 * Hook para login
 * Mutation porque modifica el estado (crea sesión)
 *
 * @module lib/api/hooks/users/use-login
 */

'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { authService } from '@/lib/api/services'
import { saveSession } from '@/lib/auth'
import type { LoginRequest, LoginResponse } from '@/lib/api/types'

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: authService.login,
    onSuccess: data => {
      // Guardar sesión usando función consolidada
      saveSession(data.token, '1') // userId por defecto
      toast.success('Login successful!')
    },
    onError: error => {
      toast.error(error?.message || 'Error logging in. Please try again.')
    },
  })
}
