import { Skeleton } from '@/components/ui/skeleton'

// Import of components custom
import {
  PageHeaderComponent,
  TableComponent,
  PaginationComponent,
} from '@/components/atomic-design/organism/generic-table/components'

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
    return (
      <div className="space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-8 w-1/4" />
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
        <Skeleton className="h-64 w-full" />
        <div className="flex justify-end">
          <Skeleton className="h-8 w-1/3" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded border border-red-600 p-4 text-red-600">
        Error loading data. Please check the console.
      </div>
    )
  }

  return (
    <div>
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
