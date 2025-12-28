/**
 * @file table-component.tsx
 * @description Fragmento de la tabla del componente GenericTable
 * @module components/atomic-design/organism/generic-table/fragments/table-component
 */

// Import of components custom
import { TableHeaderComponent, TableBodyComponent } from '@/components/atomic-design/organism/generic-table/components'

// Import of types
import { type Table } from '@tanstack/react-table'

interface TableComponentProps<TData extends Record<string, unknown>> {
  table: Table<TData>
}

export const TableComponent = <TData extends Record<string, unknown>>({
  table,
}: TableComponentProps<TData>) => {
  return (
    <div className="rounded-md border">
      <div className="w-full overflow-auto">
        <table className="w-full table-auto">
          <TableHeaderComponent table={table} />
          <TableBodyComponent table={table} />
        </table>
      </div>
    </div>
  )
}
