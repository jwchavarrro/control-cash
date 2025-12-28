/**
 * @file table-header.tsx
 * @description Componente de la cabecera de la tabla del componente GenericTable
 * @module components/atomic-design/organism/generic-table/components/table-header
 */

import { flexRender, type Table } from '@tanstack/react-table'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'

// Import of components custom
import { Text } from '@/components/atomic-design/atoms'
import { SortIndicator } from '@/components/atomic-design/organism/generic-table/components'

interface TableHeaderProps<TData extends Record<string, unknown>> {
  table: Table<TData>
}

export const TableHeaderComponent = <TData extends Record<string, unknown>>({
  table,
}: TableHeaderProps<TData>) => {
  return (
    <TableHeader>
      {table.getHeaderGroups().map(headerGroup => (
        <TableRow key={headerGroup.id}>
          {headerGroup?.headers?.map(header => {
            const canSort = header.column.getCanSort()
            const sortDirection = header.column.getIsSorted()

            return (
              <TableHead
                key={header.id}
                colSpan={header.colSpan}
                className="bg-primary text-primary-foreground p-2 text-center"
              >
                {header.isPlaceholder ? null : (
                  <div
                    className={`flex items-center justify-center gap-2 ${
                      canSort ? 'group cursor-pointer select-none' : ''
                    }`}
                    role={canSort ? 'button' : undefined}
                    onClick={
                      canSort
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    <Text variant="small">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Text>
                    {canSort && <SortIndicator sortDirection={sortDirection} />}
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
