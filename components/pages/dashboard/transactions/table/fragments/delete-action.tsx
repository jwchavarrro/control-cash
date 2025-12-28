/**
 * @file delete-action.tsx
 * @description Componente de acción de eliminación
 * @module components/pages/dashboard/transactions/table/fragments/delete-action
 */

import { Trash } from 'lucide-react'

// Import of componts custom
import { ButtonAction } from '@/components/common/generic-table'

// Import of types
import type { Transaction } from '@/lib/api/types'

export const DeleteAction = ({ row }: { row: Transaction }) => {
  // Handle
  const handleOnClickDelete = () => {
    console.log(row)
  }

  return <ButtonAction tooltipMessage="Delete" icon={Trash} />
}
