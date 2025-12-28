/**
 * @file use-login.ts
 * @description Hook para iniciar sesión
 * @module lib/api/hooks/users/use-login
 */

'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

// Import of services custom
import { authService } from '@/lib/api/services'
import { saveSession } from '@/lib/auth'

// Import of types
import type { LoginRequest, LoginResponse } from '@/lib/api/types'

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: authService.login,
    onSuccess: data => {
      // Guardar sesión usando función consolidada
      saveSession(data.token, data.user.id)
      toast.success('Login successful!')
    },
    onError: error => {
      toast.error(error?.message || 'Error logging in. Please try again.')
    },
  })
}
