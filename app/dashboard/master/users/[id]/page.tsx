/**
 * @file create-edit-user.page.tsx
 * @description Página para crear/editar un usuario
 * @module app/dashboard/master/users/[id]/page
 */

import { Hammer } from 'lucide-react'

// Import of components custom
import { Header } from '@/components/atomic-design/molecules'
import { Message } from '@/components/atomic-design/molecules/message'

export default function CreateEditUserPage() {
  return (
    <div className="container mx-auto flex flex-col gap-4">
      <Header
        title='Create/Edit User'
        text="Create or edit a user in the system. This feature is currently under development. Please check back soon."
      />
      <Message
        icon={Hammer}
        title="Under Construction"
        description="This feature is currently under development. Please check back soon."
        className="py-[5%]"
      />
    </div>
  )
}
