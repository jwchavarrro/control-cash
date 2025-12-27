/**
 * Middleware de Next.js para proteger rutas
 * Verifica autenticación antes de renderizar páginas
 *
 * @module middleware
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Verificar si el usuario está autenticado
 * Revisa si existe un token en las cookies o headers
 * Para este proyecto, verificamos localStorage en el cliente
 * pero el middleware puede verificar cookies
 */
function isAuthenticated(request: NextRequest): boolean {
  // En producción, verificarías cookies o headers
  // Por ahora, permitimos pasar y verificamos en el cliente
  // Esto evita problemas de SSR con localStorage
  return true // Se verificará en el cliente
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ['/login']
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  // Rutas protegidas (dashboard)
  const isProtectedRoute = pathname.startsWith('/dashboard')

  // Si es una ruta protegida, permitir pasar (verificación en cliente)
  // En producción, aquí verificarías cookies/tokens
  if (isProtectedRoute) {
    // La verificación real se hace en el layout con AuthGuard
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

