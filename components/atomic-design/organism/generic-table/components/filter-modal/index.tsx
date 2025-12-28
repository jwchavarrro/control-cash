import { Button } from '@/components/atomic-design/atoms/shadcn/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/atomic-design/atoms/shadcn/sheet';
import { type Table } from '@tanstack/react-table';
import { FilterIcon } from 'lucide-react';
import { Badge } from '@/components/atomic-design/atoms/shadcn/badge';
import { ColumnFilter } from './components';

interface FilterModalProps<TData extends Record<string, unknown>> {
  isOpen: boolean;
  onClose: () => void;
  table: Table<TData>;
}

export const FilterModalComponent = <TData extends Record<string, unknown>>({
  isOpen,
  onClose,
  table,
}: FilterModalProps<TData>) => {
  // Get only filterable columns
  const filterableColumns = table
    .getAllColumns()
    .filter((column) => column.getCanFilter());

  // Count active filters
  const activeFilterCount = table.getState().columnFilters.length;

  // Reset all filters
  const resetAllFilters = () => {
    table.resetColumnFilters();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='sm:max-w-md p-5'>
        <SheetHeader className='mb-2'>
          <SheetTitle className='flex items-center gap-2'>
            <FilterIcon className='h-5 w-5' />
            Filtros
            {activeFilterCount > 0 && (
              <Badge variant='secondary' className='ml-2'>
                {activeFilterCount} activos
              </Badge>
            )}
          </SheetTitle>
          <SheetDescription>
            Seleccione los filtros que desee aplicar a la tabla
          </SheetDescription>
        </SheetHeader>

        <div className='flex flex-col gap-6 py-4 overflow-y-auto max-h-[calc(100vh-180px)]'>
          {/* Display all filterable columns directly */}
          {filterableColumns.map((column) => (
            <div
              key={column.id}
              className='pb-4 border-b border-gray-100 last:border-b-0 last:pb-0'
            >
              <ColumnFilter column={column} />
            </div>
          ))}
        </div>

        <div className='flex gap-2 justify-between w-full pt-4 mt-4 border-t'>
          <Button
            variant='outline'
            onClick={resetAllFilters}
            disabled={activeFilterCount === 0}
            className='flex-1'
          >
            Limpiar
          </Button>
          <SheetClose asChild>
            <Button type='button' className='flex-1'>
              Cerrar
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};
