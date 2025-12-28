/**
 * Schemas de validación para autenticación
 * Usa Zod para validación de formularios
 *
 * @module lib/auth/schemas
 */

import { z } from 'zod'

/**
 * Schema para el formulario de login
 * Validaciones mejoradas para email y password
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .trim()
    .toLowerCase()
    .max(255, 'Email is too long')
    .refine(
      email => {
        // Validación de formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
      },
      {
        message: 'Email is not valid',
      }
    ),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(3, 'Password must be at least 3 characters')
    .max(100, 'Password is too long')
    .refine(
      password => {
        // Validación: no debe contener solo espacios
        return password.trim().length > 0
      },
      {
        message: 'Password cannot contain only spaces',
      }
    ),
})

export type LoginFormData = z.infer<typeof loginSchema>

/**
 * Schema para el formulario de registro
 * Incluye validación de confirmación de contraseña
 */
export const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
    email: z
      .string()
      .min(1, 'Email is required')
      .trim()
      .toLowerCase()
      .max(255, 'Email is too long')
      .refine(
        email => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          return emailRegex.test(email)
        },
        {
          message: 'Email is not valid',
        }
      ),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(3, 'Password must be at least 3 characters')
      .max(100, 'Password is too long')
      .refine(
        password => {
          return password.trim().length > 0
        },
        {
          message: 'Password cannot contain only spaces',
        }
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type RegisterFormData = z.infer<typeof registerSchema>

