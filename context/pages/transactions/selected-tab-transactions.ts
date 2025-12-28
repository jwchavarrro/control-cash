/**
 * @file selected-tab-transactions.ts
 * @description Contexto para la selección de tab de transacciones
 * @module context/pages/transactions/selected-tab-transactions
 */
import { context, useContext } from '@/context';

// Import of constants
import { TAB_TRANSACTIONS_OPTIONS } from '@/components/pages/dashboard/transactions/utils';

// Import of types
import { ENUM_TRANSACTION_TYPE } from '@/lib/api';

const selectedTabTransactionsContext = context<ENUM_TRANSACTION_TYPE>(
  TAB_TRANSACTIONS_OPTIONS.INCOME
)

export const useSelectedTabTransactions = () => {
  const [selectedTabTransactions, setSelectedTabTransactions] = useContext(
    selectedTabTransactionsContext
  );

  return {
    selectedTabTransactions,
    setSelectedTabTransactions,
  };
};

