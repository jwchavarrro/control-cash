import { context, useContext } from '@/context'

// Import of types
import { Transaction } from '@/lib/api/types'

const selectedTransactionsContext = context<Transaction | null>(null)

export const useSelectedTransactions = () => {
  const [selectedTransactions, setSelectedTransactions] = useContext(
    selectedTransactionsContext
  )

  return {
    selectedTransactions,
    setSelectedTransactions,
  }
}
