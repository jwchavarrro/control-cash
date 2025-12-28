/**
 * @file fragments/register-form.tsx
 * @description Formulario de registro con validaciones
 * @module components/pages/register/fragments/register-form
 */

'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { Field, FieldLabel, FieldContent } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

// Import of components custom
import { AuthFormLayout } from '@/components/atomic-design/template'
import { Text } from '@/components/atomic-design/atoms'
import { FormFieldError } from '@/components/auth'

// Import of hooks
import { useRegister } from '@/lib/api/hooks/users/use-register'

// Import of schemas
import { registerSchema, type RegisterFormData } from '@/lib/auth/schemas'

export function RegisterForm() {
  // Hooks
  const router = useRouter()

  // Implementation of custom hook
  const { mutate: register, isPending } = useRegister()

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (data: RegisterFormData) => {
    register(
      {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      {
        onSuccess: () => {
          router.push('/dashboard')
        },
      }
    )
  }

  return (
    <AuthFormLayout
      header={{
        title: 'Create an account',
        description: 'Enter your information below to create your account',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Name */}
      <Field data-invalid={errors.name ? 'true' : undefined}>
        <FieldLabel asChild htmlFor="name">
          <Text>Name</Text>
        </FieldLabel>
        <FieldContent>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            {...registerField('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          <FormFieldError message={errors.name?.message} />
        </FieldContent>
      </Field>

      {/* Email */}
      <Field data-invalid={errors.email ? 'true' : undefined}>
        <FieldLabel asChild htmlFor="email">
          <Text>Email</Text>
        </FieldLabel>
        <FieldContent>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...registerField('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          <FormFieldError message={errors.email?.message} />
        </FieldContent>
      </Field>

      {/* Password */}
      <Field data-invalid={errors.password ? 'true' : undefined}>
        <FieldLabel asChild htmlFor="password">
          <Text>Password</Text>
        </FieldLabel>
        <FieldContent>
          <Input
            id="password"
            type="password"
            placeholder="●●●●●●●●"
            {...registerField('password')}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          <FormFieldError message={errors.password?.message} />
        </FieldContent>
      </Field>

      {/* Confirm Password */}
      <Field data-invalid={errors.confirmPassword ? 'true' : undefined}>
        <FieldLabel asChild htmlFor="confirmPassword">
          <Text>Confirm Password</Text>
        </FieldLabel>
        <FieldContent>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="●●●●●●●●"
            {...registerField('confirmPassword')}
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
          />
          <FormFieldError message={errors.confirmPassword?.message} />
        </FieldContent>
      </Field>

      {/* Register Button */}
      <Field>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Creating account...' : 'Create account'}
        </Button>
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
