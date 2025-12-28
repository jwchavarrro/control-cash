/**
 * @file login.page.tsx
 * @description Página de login
 * @module app/login/page
 */

'use client'

import { ShieldUser } from 'lucide-react'

// Import of components custom
import { LoginForm } from '@/components/pages/login/fragments/login-form'
import { AuthLayout } from '@/components/atomic-design/template'

export default function LoginPage() {
  return (
    <AuthLayout icon={ShieldUser}>
      <LoginForm />
    </AuthLayout>
  )
}
