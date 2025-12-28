/**
 * @file fragments/register-form.tsx
 * @description Formulario de registro con validaciones
 * @module components/pages/register/fragments/register-form
 */

'use client'

import { Field, FieldLabel } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

// Import of components custom
import { AuthFormLayout } from '@/components/atomic-design/template'
import { Text } from '@/components/atomic-design/atoms'

export function RegisterForm() {
  return (
    <AuthFormLayout
      header={{
        title: 'Create an account',
        description: 'Enter your information below to create your account',
      }}
    >
      {/* Name */}
      <Field>
        <FieldLabel asChild htmlFor="name">
          <Text>Name</Text>
        </FieldLabel>
        <Input id="name" type="text" placeholder="John Doe" required />
      </Field>
      {/* Email */}
      <Field>
        <FieldLabel asChild htmlFor="email">
          <Text>Email</Text>
        </FieldLabel>
        <Input id="email" type="email" placeholder="m@example.com" required />
      </Field>
      {/* Password */}
      <Field>
        <FieldLabel asChild htmlFor="password">
          <Text>Password</Text>
        </FieldLabel>
        <Input id="password" type="password" placeholder="********" required />
      </Field>
      {/* Confirm Password */}
      <Field>
        <FieldLabel asChild htmlFor="confirmPassword">
          <Text>Confirm Password</Text>
        </FieldLabel>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="********"
          required
        />
      </Field>

      {/* Register Button */}
      <Field>
        <Button type="submit">Create account</Button>
      </Field>

      {/* Login Link */}
      <Field>
        <FieldLabel asChild>
          <Text className="text-center">
            Already have an account?{' '}
            <Link
              href="/login"
              className="hover:underline-primary underline-offset-4 hover:underline"
            >
              Login
            </Link>
          </Text>
        </FieldLabel>
      </Field>
    </AuthFormLayout>
  )
}
