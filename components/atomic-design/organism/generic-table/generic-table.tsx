
import React from 'react';
import { type GenericTableProps } from './types';
import { Skeleton } from '@/components/ui/skeleton';
import { useGenericTable } from './hooks/use-generic-table';
import {
  PageHeaderComponent,
  TableComponent,
  PaginationComponent,
} from './components';

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
  const { table, globalFilter, setGlobalFilter, isLoading, error } =
    useGenericTable<TData>({
      queryFn,
      columns: columnConfig,
      initialSort,
      initialPageSize,
      queryKey,
      enabled,
      actionsColumn,
    });

  if (isLoading) {
    return (
      <div className='space-y-4'>
        <div className='flex justify-between'>
          <Skeleton className='h-8 w-1/4' />
          <div className='flex space-x-2'>
            <Skeleton className='h-8 w-20' />
            <Skeleton className='h-8 w-20' />
          </div>
        </div>
        <Skeleton className='h-64 w-full' />
        <div className='flex justify-end'>
          <Skeleton className='h-8 w-1/3' />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-red-600 p-4 border border-red-600 rounded'>
        Error loading data. Please check the console.
      </div>
    );
  }

  return (
    <div>
      {/* Header with Global Search */}
      <PageHeaderComponent
        title={title}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        newButton={newButton}
      />

      {/* Table Component */}
      <TableComponent table={table} />

      {/* Pagination Component */}
      <PaginationComponent table={table} />
    </div>
  );
};
