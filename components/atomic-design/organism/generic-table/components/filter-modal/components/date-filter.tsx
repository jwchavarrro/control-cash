import { type Column } from '@tanstack/react-table';
import { DateRangePicker } from '@/components/atomic-design/molecules/date-range-picker';
import { Label } from '@/components/atomic-design/atoms/shadcn/label';
import {
  getStartDate,
  getEndDate,
  createDateRangeValue,
} from '@/components/atomic-design/organisms/generic-table/components/filter-modal/utils/helpers';

interface DateFilterProps<TData extends Record<string, unknown>> {
  column: Column<TData, unknown>;
  headerText: string;
  currentFilterValue: unknown;
}

export const DateFilter = <TData extends Record<string, unknown>>({
  column,
  headerText,
  currentFilterValue,
}: DateFilterProps<TData>) => {
  // Get start and end dates from the current filter value
  const startDate = getStartDate(currentFilterValue);
  const endDate = getEndDate(currentFilterValue);

  return (
    <div className='space-y-2'>
      <Label className='text-sm font-medium mb-2 block'>{headerText}</Label>
      <DateRangePicker
        label={headerText}
        startDate={startDate}
        endDate={endDate}
        onRangeChange={(start, end) => {
          const newValue = createDateRangeValue(start, end);
          column.setFilterValue(newValue);
        }}
        placeholder='Seleccionar rango de fechas...'
      />
    </div>
  );
};
