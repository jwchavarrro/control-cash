/**
 * Componente genérico para mostrar errores de campo en formularios
 * Incluye icono y mensaje de error
 *
 * @module components/auth/form-field-error
 */

import { CircleAlert } from 'lucide-react'
import { FieldError } from '@/components/ui/field'

// Import of utilities
import { cn } from '@/lib/utils'

interface FormFieldErrorProps {
  message: string | undefined
  className?: string
  iconSize?: string
}

/**
 * Componente para mostrar errores de campo en formularios
 * Muestra un icono de alerta y el mensaje de error
 *
 * @example
 * ```tsx
 * <FormFieldError message={errors.email?.message} />
 * ```
 */
export function FormFieldError({
  message,
  className,
  iconSize = 'size-4',
}: Readonly<FormFieldErrorProps>) {
  if (!message) {
    return null
  }

  return (
    <FieldError className={cn('flex items-center gap-2', className)}>
      <CircleAlert className={iconSize} />
      {message}
    </FieldError>
  )
}
