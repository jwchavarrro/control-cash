/**
 * Hook para registro
 * Mutation porque crea un nuevo usuario
 *
 * @module lib/api/hooks/users/use-register
 */

'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { authService } from '@/lib/api/services'
import { saveSession } from '@/lib/auth'
import type { RegisterRequest, LoginResponse } from '@/lib/api/types'

/**
 * Hook para registrar nuevo usuario
 * Guarda el token en localStorage automáticamente al tener éxito
 *
 * @returns Mutation para registro
 */
export function useRegister() {
  return useMutation<LoginResponse, Error, RegisterRequest>({
    mutationFn: authService.register,
    onSuccess: data => {
      // Guardar sesión usando función consolidada
      saveSession(data.token, data.user.id)
      toast.success('Account created successfully!')
    },
    onError: error => {
      toast.error(error?.message || 'Error creating account. Please try again.')
    },
  })
}
