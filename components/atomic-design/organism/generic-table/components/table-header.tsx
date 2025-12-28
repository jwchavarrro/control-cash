import { flexRender, type Table } from '@tanstack/react-table';
import {
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/atomic-design/atoms/shadcn/table';
import { ChevronDown, ChevronUp, Minus } from 'lucide-react';

interface TableHeaderProps<TData extends Record<string, unknown>> {
  table: Table<TData>;
}

export const TableHeaderComponent = <TData extends Record<string, unknown>>({
  table,
}: TableHeaderProps<TData>) => {
  // Helper function to render the sort indicator
  const renderSortIndicator = (sortDirection: false | 'asc' | 'desc') => {
    if (sortDirection === 'asc') {
      return <ChevronUp className='h-4 w-4 text-gray-500' />;
    }

    if (sortDirection === 'desc') {
      return <ChevronDown className='h-4 w-4 text-gray-500' />;
    }

    // Show a dash when not sorted to maintain alignment
    return <Minus className='h-4 w-4 text-gray-300' />;
  };

  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const canSort = header.column.getCanSort();
            const sortDirection = header.column.getIsSorted();

            return (
              <TableHead
                key={header.id}
                colSpan={header.colSpan}
                className='p-2 text-center'
              >
                {header.isPlaceholder ? null : (
                  <div
                    className={`flex items-center justify-center ${
                      canSort ? 'cursor-pointer select-none group' : ''
                    }`}
                    onClick={
                      canSort
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    <span className='font-medium'>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </span>
                    {canSort && (
                      <div className='ml-2 w-4 h-4 flex items-center justify-center transition-all duration-200'>
                        {renderSortIndicator(sortDirection)}
                      </div>
                    )}
                  </div>
                )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};
