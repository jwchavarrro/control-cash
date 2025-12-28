/**
 * @file register.page.tsx
 * @description Página de registro
 * @module app/register/page
 */

'use client'

import { UserPlus } from 'lucide-react'

// Import of components custom
import { RegisterForm } from '@/components/pages/register'
import { AuthLayout } from '@/components/atomic-design/template'

export default function RegisterPage() {
  return (
    <AuthLayout icon={UserPlus}>
      <RegisterForm />
    </AuthLayout>
  )
}
