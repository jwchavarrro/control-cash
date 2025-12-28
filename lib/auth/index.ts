/**
 * Utilidades y helpers de autenticación
 * Centraliza toda la lógica de autenticación
 *
 * @module lib/auth
 */

/**
 * Verificar si el usuario está autenticado
 * Revisa si existe un token en localStorage
 *
 * @returns true si el usuario está autenticado, false en caso contrario
 */
export function isAuthenticated(): boolean {
  if (globalThis.window === undefined) return false
  const token = globalThis.localStorage.getItem('token')
  return !!token
}

/**
 * Obtener el token de autenticación
 * @returns Token si existe, null en caso contrario
 */
export function getToken(): string | null {
  if (globalThis.window === undefined) return null
  return globalThis.localStorage.getItem('token')
}

/**
 * Obtener el ID del usuario
 * @returns UserId si existe, null en caso contrario
 */
export function getUserId(): string | null {
  if (globalThis.window === undefined) return null
  return globalThis.localStorage.getItem('userId')
}

/**
 * Obtener el email del usuario
 * @returns Email si existe, null en caso contrario
 */
export function getUserEmail(): string | null {
  if (globalThis.window === undefined) return null
  return globalThis.localStorage.getItem('userEmail')
}

/**
 * Obtener el nombre del usuario
 * @returns Name si existe, null en caso contrario
 */
export function getUserName(): string | null {
  if (globalThis.window === undefined) return null
  return globalThis.localStorage.getItem('userName')
}

/**
 * Cerrar sesión
 * Elimina toda la información de la sesión del localStorage
 */
export function logout(): void {
  if (globalThis.window === undefined) return
  globalThis.localStorage.removeItem('token')
  globalThis.localStorage.removeItem('userId')
  globalThis.localStorage.removeItem('userEmail')
  globalThis.localStorage.removeItem('userName')
}

/**
 * Guardar sesión después de login exitoso
 *
 * @param token - Token de autenticación
 * @param userId - ID del usuario
 * @param email - Email del usuario (opcional)
 * @param name - Nombre del usuario (opcional)
 */
export function saveSession(
  token: string,
  userId: string,
  email?: string,
  name?: string
): void {
  if (globalThis.window === undefined) return
  globalThis.localStorage.setItem('token', token)
  globalThis.localStorage.setItem('userId', userId)
  if (email) {
    globalThis.localStorage.setItem('userEmail', email)
  }
  if (name) {
    globalThis.localStorage.setItem('userName', name)
  }
}
