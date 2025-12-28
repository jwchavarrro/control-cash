/**
 * @file products.page.tsx
 * @description Página para listar los productos
 * @module app/dashboard/master/products/page
 */

import { Hammer } from 'lucide-react'

// Import of components custom
import { Header } from '@/components/atomic-design/molecules'
import { Message } from '@/components/atomic-design/molecules/message'

// Import of utilities
import { KEYWORDS } from '@/config'

export default function ProductsPage() {
  return (
    <div className="container mx-auto flex flex-col gap-4">
      <Header
        title={KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.MASTER.PRODUCTS}
        text="Explore and manage all your products in one place, with options to review, edit, and organize efficiently."
      />
      <Message
        icon={<Hammer />}
        title="Under Construction"
        description="This feature is currently under development. Please check back soon."
        className="py-[5%]"
      />
    </div>
  )
}
