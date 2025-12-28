/**
 * Página de recuperación de contraseña
 * Permite a los usuarios solicitar un reset de contraseña
 *
 * @module app/forgot/page
 */

'use client'

import Link from 'next/link'
import { HandCoinsIcon, KeyRound } from 'lucide-react'

// Import of components custom
import { ForgotPasswordForm } from '@/components/pages/forgot'
import { AuthCheck } from '@/components/auth/auth-check'

export default function ForgotPasswordPage() {
  return (
    <AuthCheck redirectIfAuthenticated>
      <div className="grid min-h-svh lg:grid-cols-2">
        {/* Column 1 - Forgot Password Form */}
        <div className="relative flex flex-col gap-4 p-6 md:p-10">
          {/* Background Image */}
          <div className="absolute right-0 bottom-0 -z-10">
            <HandCoinsIcon className="text-muted-foreground/10 size-48 md:size-72" />
          </div>

          <header className="flex justify-center gap-2 md:justify-start">
            <Link
              href="/login"
              className="font-title flex items-center gap-2 font-bold"
            >
              <HandCoinsIcon className="size-6" />
              ctrlcash
            </Link>
          </header>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <ForgotPasswordForm />
            </div>
          </div>
        </div>

        {/* Column 2 - Background Image */}
        <div className="bg-muted relative hidden lg:block">
          <div className="flex h-full items-center justify-center">
            <KeyRound className="size-96 text-muted-foreground/10" />
          </div>
        </div>
      </div>
    </AuthCheck>
  )
}

