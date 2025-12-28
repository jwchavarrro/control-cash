/**
 * @file products.page.tsx
 * @description Página para listar los productos
 * @module app/dashboard/master/products/page
 */

// Import of components custom
import { Header } from '@/components/atomic-design/molecules'

// Import of utilities
import { KEYWORDS } from '@/config'

export default function ProductsPage() {
  return (
    <div className="container mx-auto flex flex-col gap-4">
      <Header
        title={KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.TRANSACTIONS.TITLE}
        text="Explore and manage all your products in one place, with options to review, edit, and organize efficiently."
      />
    </div>
  )
}
