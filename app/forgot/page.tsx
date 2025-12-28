/**
 * @file forgot.page.tsx
 * @description Página de recuperación de contraseña
 * @module app/forgot/page
 */

'use client'

import { KeyRound } from 'lucide-react'

// Import of components custom
import { ForgotPasswordForm } from '@/components/pages/forgot'
import { AuthTemplate } from '@/components/atomic-design/template'

export default function ForgotPasswordPage() {
  return (
    <AuthTemplate icon={KeyRound}>
      <ForgotPasswordForm />
    </AuthTemplate>
  )
}
