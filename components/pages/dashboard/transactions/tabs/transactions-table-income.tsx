/**
 * @file transactions-table-income.tsx
 * @description Tabla de transacciones de tipo Income
 * @module components/pages/dashboard/transactions/fragments/transactions-table-income
 */

'use client'

import { useMemo } from 'react'

// Import of components custom
import { GenericTable } from '@/components/atomic-design/organism/generic-table'

// Import of utilities
import { ROUTES_PAGES, KEYWORDS } from '@/config'
import { getAllTransactions } from '@/lib/api/services/transactions/get-all.transaction'
import {
  CONFIG_COLUMNS,
  CONFIG_ACTIONS,
} from '@/components/pages/dashboard/transactions/table'

// Import of types
import type { RecordEntity } from '@/components/atomic-design/organism/generic-table/utils/types'
import type { Transaction, TransactionFilters } from '@/lib/api/types'
import { ENUM_TRANSACTION_TYPE } from '@/lib/api/types'

export const TransactionsTableIncome = () => {
  const filters: TransactionFilters = useMemo(
    () => ({ type: ENUM_TRANSACTION_TYPE.INCOME }),
    []
  )

  const queryFn = useMemo(
    () => async () => {
      const transactions = await getAllTransactions(filters)
      return transactions as RecordEntity<Transaction>[]
    },
    [filters]
  )

  const queryKey = useMemo(
    () => ['transactions', ENUM_TRANSACTION_TYPE.INCOME],
    []
  )

  return (
    <GenericTable<RecordEntity<Transaction>>
      queryFn={queryFn}
      columns={CONFIG_COLUMNS}
      queryKey={queryKey}
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
  )
}
