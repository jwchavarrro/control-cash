/**
 * @file login-form.tsx
 * @description Formulario de login
 * @module components/pages/login/fragments/login-form
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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <FieldGroup>
        <header className="flex flex-col items-center gap-1 text-center">
          <Title level={1} color="primary" className="text-2xl font-bold">
            Login to your account
          </Title>
          <Text>Enter your email below to login to your account</Text>
        </header>
        {/* Email */}
        <Field>
          <FieldLabel asChild htmlFor="email">
            <Text>Email</Text>
          </FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </Field>
        {/* Password */}
        <Field>
          <div className="flex items-center">
            <FieldLabel asChild htmlFor="password">
              <Text>Password</Text>
            </FieldLabel>
            <Link
              href="/forgot"
              className="hover:underline-primary ml-auto underline-offset-4 hover:underline"
            >
              <Text color="primary" variant="small">
                Forgot your password?
              </Text>
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="********"
            required
          />
        </Field>

        {/* Login Button */}
        <Field>
          <Button type="submit">Login</Button>
        </Field>

        {/* Sign up Link */}
        <Field>
          <FieldLabel asChild>
            <Text>
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="hover:underline-primary underline-offset-4 hover:underline"
              >
                Sign up
              </Link>
            </Text>
          </FieldLabel>
        </Field>
      </FieldGroup>
    </form>
  )
}
