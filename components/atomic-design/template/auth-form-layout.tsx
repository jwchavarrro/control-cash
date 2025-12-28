/**
 * @file auth-form-layout.tsx
 * @description Layout para formularios de autenticación
 * @module components/atomic-design/template/auth-form-layout
 */

'use client'

import { FieldGroup } from '@/components/ui/field'

// Import of components custom
import { Title, Text } from '@/components/atomic-design/atoms'

// Import of utilities
import { cn } from '@/lib/utils'

interface AuthFormLayoutProps {
  header: {
    title: string
    description: string
  }
  children: React.ReactNode
  className?: string
}
export function AuthFormLayout({
  header,
  children,
  className,
  ...props
}: Readonly<AuthFormLayoutProps> & React.ComponentProps<'form'>) {
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <FieldGroup>
        <header className="flex flex-col items-center gap-1 text-center">
          <Title level={1} color="primary" className="text-2xl font-bold">
            {header.title}
          </Title>
          <Text>{header.description}</Text>
        </header>
        {children}
      </FieldGroup>
    </form>
  )
}
