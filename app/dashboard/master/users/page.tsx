/**
 * @file users.page.tsx
 * @description Página para listar los usuarios
 * @module app/dashboard/master/users/page
 */

'use client'

// Import of components custom
import { Header } from '@/components/atomic-design/molecules'
import { GenericTable } from '@/components/atomic-design/organism/generic-table'
import type {
  ColumnConfig,
  RecordEntity,
} from '@/components/atomic-design/organism/generic-table/utils/types'

// Import of services
import { getAllUsers } from '@/lib/api/services/users'

// Import of types
import type { User } from '@/lib/api/types'

// Import of utilities
import { KEYWORDS } from '@/config'

export default function UsersPage() {
  const columns: ColumnConfig<RecordEntity<User>>[] = [
    {
      id: 'id',
      header: 'ID',
      enableSorting: true,
    },
    {
      id: 'name',
      header: 'Nombre',
      enableSorting: true,
    },
    {
      id: 'email',
      header: 'Email',
      enableSorting: true,
    },
    {
      id: 'createdAt',
      header: 'Fecha de Creación',
      enableSorting: true,
      meta: {
        isDate: true,
      },
    },
  ]

  return (
    <div className="container mx-auto flex flex-col gap-4">
      <Header
        title={KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.MASTER.USERS}
        text="Comprehensive management and administration of all user accounts, including user creation, modification, and access control."
      />
      <GenericTable<RecordEntity<User>>
        queryFn={async () => {
          const users = await getAllUsers()
          return users as RecordEntity<User>[]
        }}
        columns={columns}
        title=""
        initialPageSize={10}
        queryKey={['users']}
        newButton={{
          text: 'Nuevo Usuario',
          onClick: () => {
            // TODO: Implementar navegación o modal para crear usuario
            console.log('Crear nuevo usuario')
          },
        }}
      />
    </div>
  )
}
