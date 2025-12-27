/**
 * Clase de error personalizada para errores de API
 *
 * @module lib/api/services/api-error
 */

/**
 * Error personalizado para errores de API
 * Incluye información del status HTTP y datos adicionales
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
 *
 * @param response - Respuesta de fetch
 * @returns Datos parseados de la respuesta
 * @throws {ApiError} Si la respuesta no es exitosa
 */
export async function handleResponse<T>(response: Response): Promise<T> {
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



