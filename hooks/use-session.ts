/**
 * @file use-session.ts
 * @description Hook para obtener la sesión del usuario y cerrar sesión
 * @module hooks/use-session
 */

'use client'

import { useRouter } from 'next/navigation'
import {
  getToken,
  getUserId,
  getUserEmail,
  getUserName,
  isAuthenticated,
  logout as logoutAuth,
} from '@/lib/auth'

export interface SessionInfo {
  token: string | null
  userId: string | null
  email: string | null
  name: string | null
  isAuthenticated: boolean
  logout: () => void
}

export function useSession(): SessionInfo {
  const router = useRouter()

  const handleLogout = () => {
    logoutAuth()
    router.push('/login')
  }

  return {
    token: getToken(),
    userId: getUserId(),
    email: getUserEmail(),
    name: getUserName(),
    isAuthenticated: isAuthenticated(),
    logout: handleLogout,
  }
}
