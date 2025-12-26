/**
 * Servicios base para llamadas a API
 * Funciones fetch que serán usadas por los hooks de React Query
 *
 * @module lib/api/services
 */

import { API_CONFIG } from './config'
import type {
  Transaction,
  TransactionInput,
  TransactionFilters,
  LoginRequest,
  LoginResponse,
} from './types'

/**
 * Clase de error personalizada para errores de API
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * Función helper para manejar respuestas de fetch
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new ApiError(
      errorData.error || `Error ${response.status}: ${response.statusText}`,
      response.status,
      errorData
    )
  }
  return response.json()
}

/**
 * Servicios de Autenticación (ReqRes API)
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

/**
 * Servicios de Transacciones (MockAPI)
 */
export const transactionService = {
  /**
   * Obtener todas las transacciones
   *
   * @param filters - Filtros opcionales (userId, type, category)
   * @returns Array de transacciones
   * @throws {ApiError} Si la petición falla
   */
  async getAll(filters?: TransactionFilters): Promise<Transaction[]> {
    const params = new URLSearchParams()

    if (filters?.userId) {
      params.append('userId', filters.userId)
    }
    if (filters?.type) {
      params.append('type', filters.type)
    }
    if (filters?.category) {
      params.append('category', filters.category)
    }

    const url = `${API_CONFIG.mockapi.endpoints.transactions}${
      params.toString() ? `?${params.toString()}` : ''
    }`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return handleResponse<Transaction[]>(response)
  },

  /**
   * Obtener una transacción por ID
   *
   * @param id - ID de la transacción
   * @returns Transacción encontrada
   * @throws {ApiError} Si la transacción no existe o falla la petición
   */
  async getById(id: string): Promise<Transaction> {
    const response = await fetch(
      `${API_CONFIG.mockapi.endpoints.transactions}/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return handleResponse<Transaction>(response)
  },

  /**
   * Crear una nueva transacción
   *
   * @param input - Datos de la transacción
   * @returns Transacción creada
   * @throws {ApiError} Si la creación falla
   */
  async create(input: TransactionInput): Promise<Transaction> {
    const response = await fetch(API_CONFIG.mockapi.endpoints.transactions, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })

    return handleResponse<Transaction>(response)
  },

  /**
   * Actualizar una transacción existente
   *
   * @param id - ID de la transacción
   * @param input - Datos a actualizar (parciales)
   * @returns Transacción actualizada
   * @throws {ApiError} Si la actualización falla
   */
  async update(
    id: string,
    input: Partial<TransactionInput>
  ): Promise<Transaction> {
    const response = await fetch(
      `${API_CONFIG.mockapi.endpoints.transactions}/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      }
    )

    return handleResponse<Transaction>(response)
  },

  /**
   * Eliminar una transacción
   *
   * @param id - ID de la transacción
   * @throws {ApiError} Si la eliminación falla
   */
  async delete(id: string): Promise<void> {
    const response = await fetch(
      `${API_CONFIG.mockapi.endpoints.transactions}/${id}`,
      {
        method: 'DELETE',
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiError(
        errorData.error || `Error ${response.status}: ${response.statusText}`,
        response.status,
        errorData
      )
    }
  },
}

