/**
 * @file auth-form-layout.tsx
 * @description Template de layout para formularios de autenticación
 * @module components/atomic-design/template/auth-form-layout
 */

'use client'

import { ComponentProps } from 'react'
import { HandCoinsIcon, type LucideIcon } from 'lucide-react'
import Link from 'next/link'

// Import of components custom
import { AuthCheck } from '@/components/auth/auth-check'

interface AuthLayoutProps {
  children: React.ReactNode
  icon: LucideIcon
  iconProps?: ComponentProps<LucideIcon>
}

export function AuthLayout({
  children,
  icon: Icon,
  iconProps,
}: Readonly<AuthLayoutProps>) {
  return (
    <AuthCheck redirectIfAuthenticated>
      <div className="grid min-h-svh lg:grid-cols-2">
        {/* Column 1 - Auth Form */}
        <div className="relative flex flex-col gap-4 p-6 md:p-10">
          {/* Background Image */}
          <div className="absolute right-0 bottom-0 -z-10">
            <HandCoinsIcon className="text-muted-foreground/10 size-48 md:size-72" />
          </div>

          <header className="flex justify-center gap-2 md:justify-start">
            <Link
              href="/login"
              className="font-title text-primary flex items-center gap-2 font-bold"
            >
              <HandCoinsIcon className="size-12" />
              ctrlcash
            </Link>
          </header>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">{children}</div>
          </div>
        </div>

        {/* Column 2 - Background Image */}
        <div className="bg-muted relative hidden lg:block">
          <div className="flex h-full items-center justify-center">
            <Icon className="text-muted-foreground/10 size-96" {...iconProps} />
          </div>
        </div>
      </div>
    </AuthCheck>
  )
}
