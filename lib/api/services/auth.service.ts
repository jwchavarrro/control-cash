/**
 * Servicios de Autenticación (ReqRes API)
 *
 * @module lib/api/services/auth.service
 */

import { API_CONFIG } from '../config'
import { handleResponse } from './api-error'
import type { LoginRequest, LoginResponse } from '../types'

/**
 * Servicios para autenticación usando ReqRes API
 */
export const authService = {
  /**
   * Iniciar sesión
   *
   * @param credentials - Credenciales de login
   * @returns Token de autenticación
   * @throws {ApiError} Si las credenciales son inválidas
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(API_CONFIG.reqres.endpoints.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    return handleResponse<LoginResponse>(response)
  },

  /**
   * Registrar nuevo usuario
   *
   * @param credentials - Credenciales de registro
   * @returns Token de autenticación
   * @throws {ApiError} Si el registro falla
   */
  async register(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(API_CONFIG.reqres.endpoints.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    return handleResponse<LoginResponse>(response)
  },
}
