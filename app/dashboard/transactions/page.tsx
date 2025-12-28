/**
 * @file transactions.page.tsx
 * @description Página para listar las transacciones
 * @module app/dashboard/master/products/[id]/page
 */

'use client'

import { useMemo } from 'react'

// Import of components custom
import { Header, Tabs } from '@/components/atomic-design/molecules'
import {
  TransactionsTableIncome,
  TransactionsTableExpense,
} from '@/components/pages/dashboard/transactions/tabs'

// Import of utilities
import { KEYWORDS } from '@/config'
import { TAB_TRANSACTIONS_OPTIONS } from '@/components/pages/dashboard/transactions/utils'

// Import of context
import { useSelectedTabTransactions } from '@/context/pages/transactions/selected-tab-transactions'

// Import of types
import type { ENUM_TRANSACTION_TYPE } from '@/lib/api/types'
import { ENUM_TRANSACTION_TYPE as TransactionType } from '@/lib/api/types'

export default function TransactionsPage() {
  // Import of context
  const { selectedTabTransactions, setSelectedTabTransactions } =
    useSelectedTabTransactions()

  /**
   * @description Contenido de los tabs
   */
  const tabsContent = useMemo(
    () => ({
      [TransactionType.INCOME]: <TransactionsTableIncome />,
      [TransactionType.EXPENSE]: <TransactionsTableExpense />,
    }),
    []
  )

  return (
    <div className="container mx-auto flex flex-col gap-4">
      <Header
        title={KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.TRANSACTIONS.TITLE}
        text="Explore and manage all your transactions in one place, with options to review, edit, and organize efficiently."
      />
      <Tabs
        options={TAB_TRANSACTIONS_OPTIONS}
        selectedItem={selectedTabTransactions}
        setSelectedItem={item =>
          setSelectedTabTransactions(item as ENUM_TRANSACTION_TYPE)
        }
        content={tabsContent}
      />
    </div>
  )
}
