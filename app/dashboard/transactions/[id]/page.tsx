/**
 * Página para editar una transacción
 *
 * @module app/dashboard/transactions/[id]/page
 */

import { TransactionForm } from '@/components/pages/transactions/fragments/transaction-form'

interface EditTransactionPageProps {
  params: Promise<{ id: string }>
}

export default async function EditTransactionPage({
  params,
}: EditTransactionPageProps) {
  const { id } = await params

  return (
    <div>
      <h1>Editar Transacción {id}</h1>
      <TransactionForm />
    </div>
  )
}
