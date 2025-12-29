/**
 * @file delete-action.tsx
 * @description Componente de acción de eliminación
 * @module components/pages/dashboard/transactions/table/fragments/delete-action
 */

import { Trash } from 'lucide-react'

// Import of componts custom
import { ButtonAction } from '@/components/common/generic-table'

// Import of context
import { useSelectedTransaction } from '@/context/pages/transactions/selected-transaction'
import { useOpenActionDialog } from '@/context/pages/use-open-action-dialog'

// Import of types
import type { Transaction } from '@/lib/api/types'
import { ENUM_ACTION_TYPE } from '@/app/utils'

export const DeleteAction = ({ row }: { row: Transaction }) => {
  // Import of context
  const { setSelectedTransaction } = useSelectedTransaction()
  const { setAction, setOpen } = useOpenActionDialog()

  // Handle
  const handleOnClickDelete = () => {
    setSelectedTransaction(row)
    setAction(ENUM_ACTION_TYPE.DELETE)
    setOpen(true)
  }

  return (
    <ButtonAction
      tooltipMessage="Delete"
      icon={Trash}
      onClick={handleOnClickDelete}
    />
  )
}
