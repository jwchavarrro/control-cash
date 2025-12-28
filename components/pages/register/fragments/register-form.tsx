/**
 * Fragmento de formulario de registro
 * Estructura básica - la lógica se implementará después
 *
 * @module components/pages/register/fragments/register-form
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

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <FieldGroup>
        <header className="flex flex-col items-center gap-1 text-center">
          <Title level={1} color="primary" className="text-2xl font-bold">
            Create an account
          </Title>
          <Text>Enter your information below to create your account</Text>
        </header>
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
          <Input
            id="password"
            type="password"
            placeholder="********"
            required
          />
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
      </FieldGroup>
    </form>
  )
}
