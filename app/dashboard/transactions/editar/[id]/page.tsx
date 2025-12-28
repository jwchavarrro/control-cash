/**
 * @file editar-transaction.page.tsx
 * @description Página para editar una transacción
 * @module app/dashboard/transactions/editar/[id]/page
 */

interface EditarTransactionPageProps {
  params: Promise<{ id: string }>
}

export default async function EditarTransactionPage({
  params,
}: Readonly<EditarTransactionPageProps>) {
  const { id } = await params

  return (
    <div>
      <h1>Editar Transacción {id}</h1>
    </div>
  )
}

