/**
 * @file generic-table.tsx
 * @description Componente GenericTable
 * @module components/atomic-design/organism/generic-table/generic-table
 */

'use client'

// Import of components custom
import {
  PageHeaderComponent,
  PaginationComponent,
} from '@/components/atomic-design/organism/generic-table/components'
import {
  TableSkeleton,
  TableError,
  TableComponent,
} from '@/components/atomic-design/organism/generic-table/fragments'

// Import of custom hooks
import { useGenericTable } from '@/components/atomic-design/organism/generic-table/hooks/use-generic-table'

// Import of types
import { type GenericTableProps } from './utils/types'

export const GenericTable = <TData extends Record<string, unknown>>({
  queryFn,
  columns: columnConfig,
  title,
  initialPageSize,
  newButton,
  initialSort,
  queryKey,
  enabled = true,
  actionsColumn,
}: GenericTableProps<TData>) => {
  // Implement of custom hooks
  const { table, globalFilter, setGlobalFilter, isLoading, error } =
    useGenericTable<TData>({
      queryFn,
      columns: columnConfig,
      initialSort,
      initialPageSize,
      queryKey,
      enabled,
      actionsColumn,
    })

  if (isLoading) {
    return <TableSkeleton columns={columnConfig.length} />
  }

  if (error) {
    return (
      <TableError
        title="Error loading data"
        description="An error occurred while trying to load the data. Please try again later."
      />
    )
  }

  return (
    <div className="space-y-4">
      <PageHeaderComponent
        title={title}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        newButton={newButton}
      />
      <TableComponent table={table} />
      <PaginationComponent table={table} />
    </div>
  )
}
