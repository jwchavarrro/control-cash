/**
 * @file edit-action.tsx
 * @description Componente de acción de edición
 * @module components/pages/dashboard/transactions/table/fragments/edit-action
 */

import { SquarePen } from 'lucide-react'

// Import of componts custom
import { ButtonAction } from '@/components/common/generic-table'

// Import of types
import type { Transaction } from '@/lib/api/types'

export const EditAction = ({ row }: { row: Transaction }) => {
  // Handle
  const handleOnClickEdit = () => {
    console.log(row)
  }

  return <ButtonAction tooltipMessage="Edit" icon={SquarePen} />
}
