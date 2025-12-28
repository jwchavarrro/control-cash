/**
 * @file table-body.tsx
 * @description Componente de la tabla del componente GenericTable
 * @module components/atomic-design/organism/generic-table/components/table/table-body
 */

import { TableBody, TableCell, TableRow } from '@/components/ui/table'

// Import of components custom
import { Text } from '@/components/atomic-design/atoms'

// Import of types
import { flexRender, type Table } from '@tanstack/react-table'

interface TableBodyProps<TData extends Record<string, unknown>> {
  table: Table<TData>
}

export const TableBodyComponent = <TData extends Record<string, unknown>>({
  table,
}: TableBodyProps<TData>) => {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map(row => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map(cell => (
              <TableCell key={cell.id} className="p-2 text-center">
                <div className="flex items-center justify-center">
                  <span className="text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </span>
                </div>
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={table.getAllColumns().length}
            className="h-24 text-center"
          >
            <Text variant="small">No results.</Text>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}
