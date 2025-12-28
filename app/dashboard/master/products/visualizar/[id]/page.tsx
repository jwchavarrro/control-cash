/**
 * @file visualizar-product.page.tsx
 * @description Página para visualizar un producto
 * @module app/dashboard/master/products/visualizar/[id]/page
 */

interface VisualizarProductPageProps {
  params: Promise<{ id: string }>
}

export default async function VisualizarProductPage({
  params,
}: Readonly<VisualizarProductPageProps>) {
  const { id } = await params

  return (
    <div>
      <h1>Visualizar Producto {id}</h1>
    </div>
  )
}

