/**
 * @file users.page.tsx
 * @description Página para listar los usuarios
 * @module app/dashboard/master/users/page
 */

'use client'

// Import of components custom
import { Header } from '@/components/atomic-design/molecules'
import { GenericTable } from '@/components/atomic-design/organism/generic-table'


// Import of utilities
import { KEYWORDS, ROUTES_PAGES } from '@/config'
import {
  CONFIG_COLUMNS,
  CONFIG_ACTIONS,
} from '@/components/pages/dashboard/master/users/table'

// Import of custom service
import { getAllUsers } from '@/lib/api/services/users'

// Import of types
import type { RecordEntity } from '@/components/atomic-design/organism/generic-table/utils/types'
import type { User } from '@/lib/api/types'


export default function UsersPage() {
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
        columns={CONFIG_COLUMNS}
        queryKey={['users']}
        newButton={{
          text: `${KEYWORDS.COMMON.NEW} ${KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.MASTER.USERS}`,
          path: ROUTES_PAGES.MASTER.USERS.CREATE,
        }}
        actionsColumn={{
          actions: CONFIG_ACTIONS(),
          header: 'Actions',
          position: 'start',
        }}
      />
    </div>
  )
}
