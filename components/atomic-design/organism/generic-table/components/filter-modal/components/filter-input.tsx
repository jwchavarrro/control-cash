import { type Column } from '@tanstack/react-table';
import { MultiSelectDropdown } from '@/components/atomic-design/molecules/multi-select-dropdown';
import { Input } from '@/components/atomic-design/atoms/shadcn/input';
import { Label } from '@/components/atomic-design/atoms/shadcn/label';
import { toStringArray } from '@/components/atomic-design/organisms/generic-table/components/filter-modal/utils/helpers';

// Type for faceted values entry
type FacetedValue = [unknown, number];

interface FilterInputProps<TData extends Record<string, unknown>> {
  column: Column<TData, unknown>;
  headerText: string;
  currentFilterValue: unknown;
}

export const FilterInput = <TData extends Record<string, unknown>>({
  column,
  headerText,
  currentFilterValue,
}: FilterInputProps<TData>) => {
  const facetedValues = Array.from(
    column.getFacetedUniqueValues()
  ) as FacetedValue[];
  const hasFacetedValues = facetedValues.length > 0;

  // Get column meta data
  const meta = column.columnDef.meta as { singleSelect?: boolean } | undefined;

  // Check if this column should use single-select mode
  const singleSelect = meta?.singleSelect === true;

  // Display label above input/dropdown
  const labelComponent = (
    <Label className='text-sm font-medium mb-2 block'>{headerText}</Label>
  );

  if (hasFacetedValues) {
    return (
      <div className='space-y-2'>
        {labelComponent}
        <MultiSelectDropdown
          options={facetedValues
            .filter(([value]) => value !== null && value !== undefined)
            .map(([value]) => ({
              value: String(value),
              label: String(value),
            }))}
          label={headerText}
          value={toStringArray(currentFilterValue)}
          onChange={(selected) => {
            column.setFilterValue(selected.length > 0 ? selected : undefined);
          }}
          placeholder={`Filtrar por ${headerText}...`}
          singleSelect={singleSelect}
        />
      </div>
    );
  }

  return (
    <div className='space-y-2'>
      {labelComponent}
      <Input
        value={(currentFilterValue as string) || ''}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={`Filtrar por ${headerText}...`}
        className='w-full'
      />
    </div>
  );
};
