/**
 * @file actions-cell.tsx
 * @description Componente de las acciones de la celda de la tabla del componente GenericTable
 * @module components/atomic-design/organism/generic-table/components/table/actions-cell
 */

// Import of components custom
import { MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

// Import of types
import { type ActionItem } from '@/components/atomic-design/organism/generic-table/utils/types'

interface ActionsCellProps<TData extends Record<string, unknown>> {
  actions: ActionItem<TData>[]
  row: TData
}

export const ActionsCell = <TData extends Record<string, unknown>>({
  actions,
  row,
}: ActionsCellProps<TData>) => {
  const MAX_DIRECT_ACTIONS = 3

  const generateKey = (index: number): string | number => {
    if (typeof row.id === 'string' || typeof row.id === 'number') {
      return `${row.id}-${index}`
    }
    return index
  }

  if (actions.length <= MAX_DIRECT_ACTIONS) {
    return (
      <div className="flex items-center space-x-2">
        {actions.map((action, index) => {
          const ActionComponent = action.component
          const key = generateKey(index)
          return <ActionComponent key={key} row={row} />
        })}
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action, index) => {
          const ActionComponent = action.component
          const key = generateKey(index)
          return (
            <DropdownMenuItem key={key} asChild>
              <div className="cursor-pointer">
                <ActionComponent row={row} />
              </div>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
