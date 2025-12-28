/* eslint-disable complexity */
// Hook for GenericTable logic
import { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
  type PaginationState,
} from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import {
  type UseGenericTableProps,
  type GenericTableProps,
  type ColumnConfig,
} from './types';
import { ActionsCell } from '../components';

export const useGenericTable = <TData extends Record<string, unknown>>({
  queryFn,
  columns: columnConfig,
  initialSort,
  initialPageSize = 10,
  queryKey,
  enabled = true,
  actionsColumn,
}: UseGenericTableProps<TData>) => {
  // --- State Management ---
  const [sorting, setSorting] = useState<SortingState>(initialSort ?? []);
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  // --- Data Fetching ---
  // Generate query key if not provided
  const defaultQueryKey = useMemo(() => ['generic-table', queryFn], [queryFn]);
  const finalQueryKey = queryKey || defaultQueryKey;

  const {
    data: queryData,
    isLoading,
    error,
  } = useQuery<TData[], Error>({
    queryKey: finalQueryKey,
    queryFn,
    enabled,
    placeholderData: (previousData: TData[] | undefined) => previousData,
  });

  // Memoize data, ensuring it's always an array.
  const data = useMemo<TData[]>(() => {
    if (!queryData) {
      return [];
    }

    // Ensure response is an array
    return Array.isArray(queryData) ? queryData : [];
  }, [queryData]);

  // --- Column Definition Mapping ---
  const columns = useMemo<ColumnDef<TData, unknown>[]>(() => {
    // Transform the column configs into column definitions
    const mappedColumns = columnConfig.map((config: ColumnConfig<TData>) => {
      // Include the header text in the meta property for filtering
      const meta = {
        ...config.meta,
        header: config.header, // Add the header to the meta
      };

      const baseColumnDef: Omit<
        ColumnDef<TData, unknown>,
        'accessorKey' | 'accessorFn'
      > = {
        id: config.id as string,
        header: () => config.header,
        enableSorting: config.enableSorting ?? true,
        meta: meta,
      };

      // If a custom cell renderer is provided, use it
      // Note: We still need accessorKey for filtering, searching, and sorting to work properly
      // Regular data columns (like 'nombreHito') get accessorKey for full functionality
      // Computed columns (like '_estadoHito') don't get accessorKey since they have no underlying data
      if (config.cell) {
        // For regular data columns (without underscore prefix), set accessorKey
        // For computed columns (with underscore prefix), don't set accessorKey
        const isDataColumn =
          typeof config.id === 'string' && !config.id.startsWith('_');

        return {
          ...baseColumnDef,
          accessorKey: isDataColumn ? (config.id as keyof TData) : undefined,
          cell: config.cell,
        } as ColumnDef<TData, unknown>;
      }

      // For date fields, provide a date formatter
      if (config.meta?.isDate && typeof config.id === 'string') {
        return {
          ...baseColumnDef,
          accessorKey: config.id as keyof TData,
          cell: ({ row }) => {
            const value = row.original[config.id as keyof TData] as string;
            return value ? new Date(value).toLocaleDateString() : 'N/A';
          },
        } as ColumnDef<TData, unknown>;
      }

      // For regular fields, provide a default cell renderer that shows the raw value
      if (typeof config.id === 'string') {
        return {
          ...baseColumnDef,
          accessorKey: config.id as keyof TData,
          cell: ({ row }) => {
            const value = row.original[config.id as keyof TData];
            // Handle different types of values
            if (value === null || value === undefined) {
              return '-';
            }
            if (typeof value === 'object') {
              return JSON.stringify(value);
            }
            return String(value);
          },
        } as ColumnDef<TData, unknown>;
      }

      return baseColumnDef as ColumnDef<TData, unknown>;
    });

    // If actions column is defined, create and add it
    if (actionsColumn && actionsColumn.actions.length > 0) {
      const actionsColumnDef: ColumnDef<TData, unknown> = {
        id: '_actions',
        header: actionsColumn.header || 'Actions',
        enableSorting: false,
        meta: {
          header: actionsColumn.header || 'Actions', // Add header to meta
        },
        cell: ({ row }) => {
          // Render ActionsCell, which now handles the key generation internally
          return (
            <ActionsCell actions={actionsColumn.actions} row={row.original} />
          );
        },
      };

      const position = actionsColumn.position || 'end';
      if (position === 'start') {
        return [actionsColumnDef, ...mappedColumns];
      } else {
        return [...mappedColumns, actionsColumnDef];
      }
    }

    return mappedColumns;
  }, [columnConfig, actionsColumn]);

  // --- TanStack Table Instance ---
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
  });

  return {
    table,
    isLoading,
    error,
    globalFilter,
    setGlobalFilter,
  };
};
