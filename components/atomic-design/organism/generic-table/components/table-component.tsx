import { type Table } from '@tanstack/react-table';
import { TableHeaderComponent } from './table-header';
import { TableBodyComponent } from './table-body';

interface TableComponentProps<TData extends Record<string, unknown>> {
  table: Table<TData>;
}

export const TableComponent = <TData extends Record<string, unknown>>({
  table,
}: TableComponentProps<TData>) => {
  return (
    <div className='rounded-md border'>
      <div className='w-full overflow-auto'>
        <table className='w-full table-auto'>
          <TableHeaderComponent table={table} />
          <TableBodyComponent table={table} />
        </table>
      </div>
    </div>
  );
};
