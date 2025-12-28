/**
 * @file selected-tab-transactions.ts
 * @description Contexto para la selección de tab de transacciones
 * @module context/pages/transactions/selected-tab-transactions
 */
import { context, useContext } from '@/context'

// Import of types
import { ENUM_TRANSACTION_TYPE } from '@/lib/api'

const selectedTabTransactionsContext = context<ENUM_TRANSACTION_TYPE>(
  ENUM_TRANSACTION_TYPE.INCOME
)

export const useSelectedTabTransactions = () => {
  const [selectedTabTransactions, setSelectedTabTransactions] = useContext(
    selectedTabTransactionsContext
  )

  return {
    selectedTabTransactions,
    setSelectedTabTransactions,
  }
}
