/**
 * @file transactions.page.tsx
 * @description Página para listar las transacciones
 * @module app/dashboard/master/products/[id]/page
 */

// Import of components custom
import { Header } from '@/components/atomic-design/molecules'
import { GenericTable } from '@/components/atomic-design/organism/generic-table'

// Import of utilities
import { ROUTES_PAGES, KEYWORDS } from '@/config'
import { getAllTransactions } from '@/lib/api/services/transactions/get-all.transaction'
import { CONFIG_COLUMNS, CONFIG_ACTIONS } from '@/components/pages/dashboard/transactions/table'

// Import of types
import type { RecordEntity } from '@/components/atomic-design/organism/generic-table/utils/types'
import type { Transaction } from '@/lib/api/types'


export default function TransactionsPage() {
  return (
    <div className="container mx-auto flex flex-col gap-4">
      <Header
        title={KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.TRANSACTIONS.TITLE}
        text="Explore and manage all your transactions in one place, with options to review, edit, and organize efficiently."
      />
      <GenericTable<RecordEntity<Transaction>>
        queryFn={async () => {
          const transactions = await getAllTransactions()
          return transactions as RecordEntity<Transaction>[]
        }}
        columns={CONFIG_COLUMNS}
        queryKey={['transactions']}
        newButton={{
          text: `${KEYWORDS.COMMON.NEW} ${KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.TRANSACTIONS.TITLE}`,
          path: ROUTES_PAGES.TRANSACTIONS.CREATE,
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
