/**
 * Componente unificado para verificación de autenticación
 * Reemplaza AuthGuard y LoginRedirect con una solución más simple
 *
 * @module components/auth/auth-check
 */

'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { isAuthenticated } from '@/lib/auth'

interface AuthCheckProps {
  children: React.ReactNode
  redirectIfAuthenticated?: boolean
}

export function AuthCheck({
  children,
  redirectIfAuthenticated = false,
}: Readonly<AuthCheckProps>) {
  const router = useRouter()

  useEffect(() => {
    const authenticated = isAuthenticated()

    if (redirectIfAuthenticated && authenticated) {
      router.replace('/dashboard')
    } else if (!redirectIfAuthenticated && !authenticated) {
      router.replace('/login')
    }
  }, [router, redirectIfAuthenticated])

  // Verificar antes de renderizar (evita flash de contenido)
  const authenticated = isAuthenticated()

  if (redirectIfAuthenticated && authenticated) {
    return null
  }

  if (!redirectIfAuthenticated && !authenticated) {
    return null
  }

  return <>{children}</>
}

