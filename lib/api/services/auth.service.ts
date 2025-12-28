/**
 * Servicios de Autenticación (MockAPI)
 *
 * @module lib/api/services/auth.service
 */

import { API_CONFIG } from '@/lib/api/config'
import { handleResponse } from '@/lib/api/services/api-error'
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from '@/lib/api/types'

/**
 * Generar token simple
 */
function generateToken(userId: string): string {
  return `mock-token-${userId}-${Date.now()}`
}

/**
 * Servicios para autenticación usando MockAPI
 */
export const authService = {
  /**
   * Iniciar sesión
   * Busca el usuario por email y valida la contraseña
   *
   * @param credentials - Credenciales de login
   * @returns Token y datos del usuario
   * @throws {ApiError} Si las credenciales son inválidas
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // Buscar usuario por email
    const response = await fetch(
      `${API_CONFIG.mockapi.endpoints.users}?email=${encodeURIComponent(credentials.email)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const users: User[] = await handleResponse<User[]>(response)

    // Verificar que existe el usuario
    const user = users.find(u => u.email === credentials.email)
    if (!user) {
      throw new Error('Invalid email or password')
    }

    // Validar contraseña
    if (user.password !== credentials.password) {
      throw new Error('Invalid email or password')
    }

    // Generar token y retornar
    const token = generateToken(user.id)
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    }
  },

  /**
   * Registrar nuevo usuario
   * Crea un nuevo usuario en MockAPI
   *
   * @param credentials - Credenciales de registro
   * @returns Token y datos del usuario creado
   * @throws {ApiError} Si el registro falla
   */
  async register(credentials: RegisterRequest): Promise<LoginResponse> {
    // Verificar si el usuario ya existe
    const checkResponse = await fetch(
      `${API_CONFIG.mockapi.endpoints.users}?email=${encodeURIComponent(credentials.email)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const existingUsers: User[] = await handleResponse<User[]>(checkResponse)
    if (existingUsers.length > 0) {
      throw new Error('User with this email already exists')
    }

    // Crear nuevo usuario
    const response = await fetch(API_CONFIG.mockapi.endpoints.users, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        name: credentials.name || '',
      }),
    })

    const user: User = await handleResponse<User>(response)

    // Generar token y retornar
    const token = generateToken(user.id)
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    }
  },
}
