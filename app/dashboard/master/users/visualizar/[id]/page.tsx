/**
 * @file visualizar-user.page.tsx
 * @description Página para visualizar un usuario
 * @module app/dashboard/master/users/visualizar/[id]/page
 */

interface VisualizarUserPageProps {
  params: Promise<{ id: string }>
}

export default async function VisualizarUserPage({
  params,
}: Readonly<VisualizarUserPageProps>) {
  const { id } = await params

  return (
    <div>
      <h1>Visualizar Usuario {id}</h1>
    </div>
  )
}

