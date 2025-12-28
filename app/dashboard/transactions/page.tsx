/**
 * @file transactions.page.tsx
 * @description Página para listar las transacciones
 * @module app/dashboard/master/products/[id]/page
 */

// Import of components custom
import { Header } from '@/components/atomic-design/molecules'

// Import of utilities
import { KEYWORDS } from '@/config'

export default function TransactionsPage() {
  return (
    <div className="container mx-auto flex flex-col gap-4">
      <Header
        title={KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.TRANSACTIONS.TITLE}
        text="Explore and manage all your transactions in one place, with options to review, edit, and organize efficiently."
      />
    </div>
  )
}
