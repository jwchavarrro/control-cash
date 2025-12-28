/**
 * @file editar-product.page.tsx
 * @description Página para editar un producto
 * @module app/dashboard/master/products/editar/[id]/page
 */

interface EditarProductPageProps {
  params: Promise<{ id: string }>
}

export default async function EditarProductPage({
  params,
}: Readonly<EditarProductPageProps>) {
  const { id } = await params

  return (
    <div>
      <h1>Editar Producto {id}</h1>
    </div>
  )
}

