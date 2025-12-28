/**
 * @file login-form.tsx
 * @description Formulario de login con validaciones
 * @module components/pages/login/fragments/login-form
 */

'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { Field, FieldGroup, FieldLabel, FieldError, FieldContent } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

// Import of components custom
import { Title, Text } from '@/components/atomic-design/atoms'
import { FormFieldError } from '@/components/auth'

// Import of hooks
import { useLogin } from '@/lib/api/hooks/users/use-login'

// Import of schemas
import { loginSchema, type LoginFormData } from '@/lib/auth/schemas'

// Import of utilities
import { cn } from '@/lib/utils'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  // Hooks
  const router = useRouter()

  // Implementation of custom hook
  const { mutate: login, isPending, isError, error } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: () => {
        router.push('/dashboard')
      },
    })
  }

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <FieldGroup>
        <header className="flex flex-col items-center gap-1 text-center">
          <Title level={1} color="primary" className="text-2xl font-bold">
            Login to your account
          </Title>
          <Text>Enter your email below to login to your account</Text>
        </header>

        {/* Error general del servidor */}
        {isError && (
          <Field>
            <FieldError>
              {error?.message || 'Error logging in. Please try again.'}
            </FieldError>
          </Field>
        )}

        {/* Email */}
        <Field data-invalid={errors.email ? 'true' : undefined}>
          <FieldLabel asChild htmlFor="email">
            <Text>Email</Text>
          </FieldLabel>
          <FieldContent>
            <Input
              id="email"
              type="email"
              placeholder="ctrlcash@example.com"
              {...register('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            <FormFieldError message={errors.email?.message} />
          </FieldContent>
        </Field>

        {/* Password */}
        <Field data-invalid={errors.password ? 'true' : undefined}>
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
          <FieldContent>
            <Input
              id="password"
              type="password"
              placeholder="●●●●●●●●"
              {...register('password')}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            <FormFieldError message={errors.password?.message} />
          </FieldContent>
        </Field>

        {/* Login Button */}
        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
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
