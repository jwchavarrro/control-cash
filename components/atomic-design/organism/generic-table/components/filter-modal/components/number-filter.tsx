import { useMemo } from 'react';
import { type Column, type Row } from '@tanstack/react-table';
import { NumberRangeFilter } from './number-range-filter';
import {
  getMinValue,
  getMaxValue,
  createNumberRangeValue,
} from '@/components/atomic-design/organisms/generic-table/components/filter-modal/utils/helpers';

interface NumberFilterProps<TData extends Record<string, unknown>> {
  column: Column<TData, unknown>;
  headerText: string;
  currentFilterValue: unknown;
}

export const NumberFilter = <TData extends Record<string, unknown>>({
  column,
  headerText,
  currentFilterValue,
}: NumberFilterProps<TData>) => {
  // Calculate min and max values from column data
  const { minColumnValue, maxColumnValue } = useMemo(() => {
    let min = Number.MAX_SAFE_INTEGER;
    let max = Number.MIN_SAFE_INTEGER;

    try {
      // Check if table exists on column and has getPreFilteredRowModel method
      if (column.getFacetedRowModel) {
        const rowModel = column.getFacetedRowModel();

        // Find min and max values in the column data
        rowModel.rows.forEach((row: Row<TData>) => {
          const value = row.getValue(column.id);
          if (typeof value === 'number') {
            min = Math.min(min, value);
            max = Math.max(max, value);
          }
        });
      }
    } catch {
      // Silently catch errors during min/max calculation
    }

    // Fallback to default range if no valid values found
    if (min === Number.MAX_SAFE_INTEGER || max === Number.MIN_SAFE_INTEGER) {
      return { minColumnValue: 0, maxColumnValue: 100 };
    }

    return { minColumnValue: min, maxColumnValue: max };
  }, [column]);

  return (
    <NumberRangeFilter
      label={headerText}
      minValue={getMinValue(currentFilterValue)}
      maxValue={getMaxValue(currentFilterValue)}
      min={minColumnValue}
      max={maxColumnValue}
      onChange={(min, max) => {
        const newValue = createNumberRangeValue(min, max);
        column.setFilterValue(newValue);
      }}
    />
  );
};
