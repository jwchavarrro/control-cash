/**
 * @file table-header.tsx
 * @description Componente de la cabecera de la tabla del componente GenericTable
 * @module components/atomic-design/organism/generic-table/components/table-header
 */

import { flexRender, type Table } from '@tanstack/react-table'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ChevronDown, ChevronUp, Minus } from 'lucide-react'

interface TableHeaderProps<TData extends Record<string, unknown>> {
  table: Table<TData>
}

export const TableHeaderComponent = <TData extends Record<string, unknown>>({
  table,
}: TableHeaderProps<TData>) => {
  const renderSortIndicator = (sortDirection: false | 'asc' | 'desc') => {
    if (sortDirection === 'asc') {
      return <ChevronUp className="h-4 w-4 text-gray-500" />
    }

    if (sortDirection === 'desc') {
      return <ChevronDown className="h-4 w-4 text-gray-500" />
    }
    return <Minus className="h-4 w-4 text-gray-300" />
  }

  return (
    <TableHeader>
      {table.getHeaderGroups().map(headerGroup => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map(header => {
            const canSort = header.column.getCanSort()
            const sortDirection = header.column.getIsSorted()

            return (
              <TableHead
                key={header.id}
                colSpan={header.colSpan}
                className="p-2 text-center"
              >
                {header.isPlaceholder ? null : (
                  <div
                    className={`flex items-center justify-center ${
                      canSort ? 'group cursor-pointer select-none' : ''
                    }`}
                    onClick={
                      canSort
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    <span className="font-medium">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </span>
                    {canSort && (
                      <div className="ml-2 flex h-4 w-4 items-center justify-center transition-all duration-200">
                        {renderSortIndicator(sortDirection)}
                      </div>
                    )}
                  </div>
                )}
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeader>
  )
}
