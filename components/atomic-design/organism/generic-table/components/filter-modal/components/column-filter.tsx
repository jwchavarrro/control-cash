import { type Column } from '@tanstack/react-table';
import { FilterInput } from './filter-input';
import { DateFilter } from './date-filter';
import { NumberFilter } from './number-filter';

interface ColumnFilterProps<TData extends Record<string, unknown>> {
  column: Column<TData, unknown>;
}

export const ColumnFilter = <TData extends Record<string, unknown>>({
  column,
}: ColumnFilterProps<TData>) => {
  const { columnDef } = column;
  const meta = columnDef.meta as
    | { isDate?: boolean; isNumber?: boolean; header?: string }
    | undefined;

  // Detect column types
  const isDate = meta?.isDate;
  const isNumber = meta?.isNumber;

  // Get current filter value
  const currentFilterValue = column.getFilterValue();

  // Use header from meta if available, or fall back to column ID
  // We'll add the header to meta in the use-generic-table.tsx hook
  const headerText =
    meta?.header ||
    column.id.charAt(0).toUpperCase() + column.id.slice(1).replace(/_/g, ' ');

  // Determine which filter component to use based on column type
  const renderFilterComponent = () => {
    if (isDate) {
      return (
        <DateFilter
          column={column}
          headerText={headerText}
          currentFilterValue={currentFilterValue}
        />
      );
    }

    if (isNumber) {
      return (
        <NumberFilter
          column={column}
          headerText={headerText}
          currentFilterValue={currentFilterValue}
        />
      );
    }

    // Default to string filter (multi-select or text input)
    return (
      <FilterInput
        column={column}
        headerText={headerText}
        currentFilterValue={currentFilterValue}
      />
    );
  };

  return (
    <div key={column.id} className='space-y-3'>
      {renderFilterComponent()}
    </div>
  );
};
