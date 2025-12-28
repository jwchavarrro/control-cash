/**
 * @file pagination.tsx
 * @description Componente de la paginación de la tabla del componente GenericTable
 * @module components/atomic-design/organism/generic-table/components/table/pagination
 */

import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

// Import of components custom
import { Text } from '@/components/atomic-design/atoms'

// Import of types
import { type Table } from '@tanstack/react-table'

interface PaginationProps<TData extends Record<string, unknown>> {
  table: Table<TData>
}

export const PaginationComponent = <TData extends Record<string, unknown>>({
  table,
}: PaginationProps<TData>) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="hidden lg:flex"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft className="size-4" />
        </Button>
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="size-4" />
        </Button>

        <div className="flex items-center justify-center">
          <Text variant="small">{`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}</Text>
        </div>

        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden lg:flex"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
