/**
 * Esquemas de validación para autenticación
 * Usa Zod para validar formularios de login y registro
 *
 * @module lib/auth/schemas
 */

import { z } from 'zod'

/**
 * Esquema de validación para login
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('El email no es válido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export type LoginFormData = z.infer<typeof loginSchema>

