/**
 * @file use-session.ts
 * @description Hook para obtener la sesión del usuario y cerrar sesión
 * @module hooks/use-session
 */

'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
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
  
  /**
   * @name getInitialSession
   * @description Obtiene la sesión inicial
   * @returns {Omit<SessionInfo, 'logout'>}
   */
  const getInitialSession = (): Omit<SessionInfo, 'logout'> => {
    if (globalThis.window === undefined) {
      return {
        token: null,
        userId: null,
        email: null,
        name: null,
        isAuthenticated: false,
      }
    }

    try {
      return {
        token: getToken(),
        userId: getUserId(),
        email: getUserEmail(),
        name: getUserName(),
        isAuthenticated: isAuthenticated(),
      }
    } catch (error) {
      console.error('Error reading session:', error)
      return {
        token: null,
        userId: null,
        email: null,
        name: null,
        isAuthenticated: false,
      }
    }
  }

  /**
   * @name session
   * @description Estado de la sesión
   * @type {Omit<SessionInfo, 'logout'>}
   */
  const [session, setSession] = useState<Omit<SessionInfo, 'logout'>>(getInitialSession)

  /**
   * @name updateSession
   * @description Actualiza la sesión
   */
  const updateSession = useCallback(() => {
    try {
      setSession({
        token: getToken(),
        userId: getUserId(),
        email: getUserEmail(),
        name: getUserName(),
        isAuthenticated: isAuthenticated(),
      })
    } catch (error) {
      console.error('Error updating session:', error)
      setSession({
        token: null,
        userId: null,
        email: null,
        name: null,
        isAuthenticated: false,
      })
    }
  }, [])

  /**
   * @name useEffect
   * @description Actualizar estado cuando el componente se monta y escuchar cambios
   */
  useEffect(() => {
    /**
     * @name handleStorageChange
     * @description Escuchar cambios en localStorage (entre tabs/windows)
     * @param {StorageEvent} e - Evento de almacenamiento
     */
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === 'token' ||
        e.key === 'userId' ||
        e.key === 'userEmail' ||
        e.key === 'userName'
      ) {
        updateSession()
      }
    }

    /**
     * @name handleCustomStorageChange
     * @description Escuchar eventos personalizados para cambios en el mismo tab
     * @param {Event} e - Evento personalizado
     */
    const handleCustomStorageChange = () => {
      updateSession()
    }

    if (globalThis.window !== undefined) {
      globalThis.addEventListener('storage', handleStorageChange)
      globalThis.addEventListener('session-change', handleCustomStorageChange)
    }

    return () => {
      if (globalThis.window !== undefined) {
        globalThis.removeEventListener('storage', handleStorageChange)
        globalThis.removeEventListener('session-change', handleCustomStorageChange)
      }
    }
  }, [updateSession])

  /**
   * @name handleLogout
   * @description Función de logout con manejo de errores
   */
  const handleLogout = useCallback(() => {
    try {
      logoutAuth()
      
      /**
       * @name handleCustomStorageChange
       * @description Disparar evento personalizado para actualizar otros componentes
       */
      if (globalThis.window !== undefined) {
        globalThis.dispatchEvent(new Event('session-change'))
      }

      /**
       * @name setSession
       * @description Actualizar estado local
       */
      setSession({
        token: null,
        userId: null,
        email: null,
        name: null,
        isAuthenticated: false,
      })

      /**
       * @name router.push
       * @description Redirigir al login
       */
      router.push('/login')
    } catch (error) {
      console.error('Error during logout:', error)
      router.push('/login')
    }
  }, [router])

  /**
   * @name sessionInfo
   * @description Memoizar el resultado para evitar recreaciones innecesarias
   * @returns {SessionInfo}
   */
  const sessionInfo = useMemo<SessionInfo>(
    () => ({
      ...session,
      logout: handleLogout,
    }),
    [session, handleLogout]
  )

  /**
   * @name return
   * @description Retornar la sesión
   * @returns {SessionInfo}
   */
  if (globalThis.window === undefined) {
    return {
      token: null,
      userId: null,
      email: null,
      name: null,
      isAuthenticated: false,
      logout: handleLogout,
    }
  }

  return sessionInfo
}
