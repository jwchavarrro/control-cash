import { context, useContext } from '@/context'

// Import of types
import { Transaction } from '@/lib/api/types'

const selectedTransactionContext = context<Transaction | null>(null)

export const useSelectedTransaction = () => {
  const [selectedTransaction, setSelectedTransaction] = useContext(
    selectedTransactionContext
  )

  return {
    selectedTransaction,
    setSelectedTransaction,
  }
}
