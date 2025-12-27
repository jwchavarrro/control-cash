/**
 * Fragmento de formulario de login
 *
 * @module components/pages/login/fragments/login-form
 */

"use client"

import {
  Field,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

// Import of components custom
import { Title } from '@/components/atomic-design/atoms/title'
import { Text } from '@/components/atomic-design/atoms/text'

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
          <Title level={1}>Login to your account</Title>
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
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              <Text>Forgot your password?</Text>
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
              <Link href="#" className="underline underline-offset-4">
                Sign up
              </Link>
            </Text>
          </FieldLabel>
        </Field>
      </FieldGroup>
    </form>
  )
}
