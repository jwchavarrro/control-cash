 
import { useMemo, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
  type PaginationState,
} from '@tanstack/react-table'
import { useQuery } from '@tanstack/react-query'
import {
  type UseGenericTableProps,
  type GenericTableProps,
  type ColumnConfig,
} from './types'
import { ActionsCell } from '../components'

export const useGenericTable = <TData extends Record<string, unknown>>({
  queryFn,
  columns: columnConfig,
  initialSort,
  initialPageSize = 10,
  queryKey,
  enabled = true,
  actionsColumn,
}: UseGenericTableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>(initialSort ?? [])
  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  })

  const defaultQueryKey = useMemo(() => ['generic-table', queryFn], [queryFn])
  const finalQueryKey = queryKey || defaultQueryKey

  const {
    data: queryData,
    isLoading,
    error,
  } = useQuery<TData[], Error>({
    queryKey: finalQueryKey,
    queryFn,
    enabled,
    placeholderData: (previousData: TData[] | undefined) => previousData,
  })

  const data = useMemo<TData[]>(() => {
    if (!queryData) {
      return []
    }
    return Array.isArray(queryData) ? queryData : []
  }, [queryData])

  const columns = useMemo<ColumnDef<TData, unknown>[]>(() => {
    const mappedColumns = columnConfig.map((config: ColumnConfig<TData>) => {
      const meta = {
        ...config.meta,
        header: config.header,
      }

      const baseColumnDef: Omit<
        ColumnDef<TData, unknown>,
        'accessorKey' | 'accessorFn'
      > = {
        id: config.id as string,
        header: () => config.header,
        enableSorting: config.enableSorting ?? true,
        meta: meta,
      }

      if (config.cell) {
        const isDataColumn =
          typeof config.id === 'string' && !config.id.startsWith('_')

        return {
          ...baseColumnDef,
          accessorKey: isDataColumn ? (config.id as keyof TData) : undefined,
          cell: config.cell,
        } as ColumnDef<TData, unknown>
      }

      if (config.meta?.isDate && typeof config.id === 'string') {
        return {
          ...baseColumnDef,
          accessorKey: config.id as keyof TData,
          cell: ({ row }) => {
            const value = row.original[config.id as keyof TData] as string
            return value ? new Date(value).toLocaleDateString() : 'N/A'
          },
        } as ColumnDef<TData, unknown>
      }

      if (typeof config.id === 'string') {
        return {
          ...baseColumnDef,
          accessorKey: config.id as keyof TData,
          cell: ({ row }) => {
            const value = row.original[config.id as keyof TData]
            if (value === null || value === undefined) {
              return '-'
            }
            if (typeof value === 'object') {
              return JSON.stringify(value)
            }
            return String(value)
          },
        } as ColumnDef<TData, unknown>
      }

      return baseColumnDef as ColumnDef<TData, unknown>
    })

    if (actionsColumn && actionsColumn.actions.length > 0) {
      const actionsColumnDef: ColumnDef<TData, unknown> = {
        id: '_actions',
        header: actionsColumn.header || 'Actions',
        enableSorting: false,
        meta: {
          header: actionsColumn.header || 'Actions',
        },
        cell: ({ row }) => {
          return (
            <ActionsCell actions={actionsColumn.actions} row={row.original} />
          )
        },
      }

      const position = actionsColumn.position || 'end'
      if (position === 'start') {
        return [actionsColumnDef, ...mappedColumns]
      } else {
        return [...mappedColumns, actionsColumnDef]
      }
    }

    return mappedColumns
  }, [columnConfig, actionsColumn])

  const table = useReactTable<TData>({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: process.env.NODE_ENV === 'development',
  })

  return {
    table,
    isLoading,
    error,
    globalFilter,
    setGlobalFilter,
  }
}
