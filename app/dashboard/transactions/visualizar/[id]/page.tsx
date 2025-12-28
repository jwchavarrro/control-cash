/**
 * @file visualizar-transaction.page.tsx
 * @description Página para visualizar una transacción
 * @module app/dashboard/transactions/visualizar/[id]/page
 */

interface VisualizarTransactionPageProps {
  params: Promise<{ id: string }>
}

export default async function VisualizarTransactionPage({
  params,
}: Readonly<VisualizarTransactionPageProps>) {
  const { id } = await params

  return (
    <div>
      <h1>Visualizar Transacción {id}</h1>
    </div>
  )
}
