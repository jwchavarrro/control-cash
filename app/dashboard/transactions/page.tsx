/**
 * Página para crear una nueva transacción
 *
 * @module app/dashboard/transactions/new/page
 */

import { TransactionForm } from '@/components/pages/transactions/fragments/transaction-form'

export default function NewTransactionPage() {
  return (
    <div>
      <h1>Nueva Transacción</h1>
      <TransactionForm />
    </div>
  )
}

