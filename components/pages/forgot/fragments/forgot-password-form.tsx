/**
 * @file fragments/forgot-password-form.tsx
 * @description Formulario de recuperación de contraseña
 * @module components/pages/forgot/fragments/forgot-password-form
 */

'use client'

import { Field, FieldLabel } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

// Import of components custom
import { AuthFormLayout } from '@/components/atomic-design/template'
import { Text } from '@/components/atomic-design/atoms'

export function ForgotPasswordForm() {
  return (
    <AuthFormLayout
      header={{
        title: 'Forgot your password?',
        description:
          "Enter your email address and we'll send you a link to reset your password.",
      }}
    >
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
    </AuthFormLayout>
  )
}
