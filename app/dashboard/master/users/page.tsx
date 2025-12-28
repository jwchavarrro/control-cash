/**
 * @file users.page.tsx
 * @description Página para listar los usuarios
 * @module app/dashboard/master/users/page
 */

// Import of components custom
import { Header } from '@/components/atomic-design/molecules'

// Import of utilities
import { KEYWORDS } from '@/config'

export default function UsersPage() {
  return (
    <div className="container mx-auto flex flex-col gap-4">
      <Header
        title={KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.MASTER.USERS}
        text="Comprehensive management and administration of all user accounts, including user creation, modification, and access control."
      />
    </div>
  )
}
