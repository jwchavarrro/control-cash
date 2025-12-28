/**
 * @file editar-user.page.tsx
 * @description Página para editar un usuario
 * @module app/dashboard/master/users/editar/[id]/page
 */

interface EditarUserPageProps {
  params: Promise<{ id: string }>
}

export default async function EditarUserPage({
  params,
}: Readonly<EditarUserPageProps>) {
  const { id } = await params

  return (
    <div>
      <h1>Editar Usuario {id}</h1>
    </div>
  )
}
