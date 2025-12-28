/**
 * Fragmento de formulario de recuperación de contraseña
 * Estructura básica - la lógica se implementará después
 *
 * @module components/pages/forgot/fragments/forgot-password-form
 */

'use client'

import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

// Import of components custom
import { Title, Text } from '@/components/atomic-design/atoms'

// Import of utilities
import { cn } from '@/lib/utils'

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <FieldGroup>
        <header className="flex flex-col items-center gap-1 text-center">
          <Title level={1} color="primary" className="text-2xl font-bold">
            Forgot your password?
          </Title>
          <Text>
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </Text>
        </header>
        {/* Email */}
        <Field>
          <FieldLabel asChild htmlFor="email">
            <Text>Email</Text>
          </FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </Field>

        {/* Submit Button */}
        <Field>
          <Button type="submit">Send reset link</Button>
        </Field>

        {/* Back to Login Link */}
        <Field>
          <FieldLabel asChild>
            <Text className="text-center">
              Remember your password?{' '}
              <Link
                href="/login"
                className="hover:underline-primary underline-offset-4 hover:underline"
              >
                Back to login
              </Link>
            </Text>
          </FieldLabel>
        </Field>
      </FieldGroup>
    </form>
  )
}
