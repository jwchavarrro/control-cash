import { Button } from '@/components/atomic-design/atoms/shadcn/button';
import { Label } from '@/components/atomic-design/atoms/shadcn/label';
import { Slider } from '@/components/atomic-design/atoms/shadcn/slider';
import { X } from 'lucide-react';

interface NumberRangeFilterProps {
  label: string;
  minValue: number | undefined;
  maxValue: number | undefined;
  onChange: (min: number | undefined, max: number | undefined) => void;
  min?: number;
  max?: number;
}

export const NumberRangeFilter = ({
  label,
  minValue,
  maxValue,
  onChange,
  min: defaultMin = 0,
  max: defaultMax = 100,
}: NumberRangeFilterProps) => {
  // Get the values to display in the slider
  const actualMin = defaultMin;
  const actualMax = defaultMax;

  // Calculate the current display values for the slider
  const displayMinValue = minValue !== undefined ? minValue : actualMin;
  const displayMaxValue = maxValue !== undefined ? maxValue : actualMax;

  // Helper function to get range display text
  const getRangeDisplayText = () => {
    if (minValue !== undefined && maxValue !== undefined) {
      return `Rango: ${minValue} - ${maxValue}`;
    }

    if (minValue !== undefined) {
      return `Mínimo: ${minValue}`;
    }

    if (maxValue !== undefined) {
      return `Máximo: ${maxValue}`;
    }

    return '';
  };

  // Handle slider change
  const handleSliderChange = (value: [number, number]) => {
    onChange(value[0], value[1]);
  };

  // Clear the range filter
  const clearRange = () => {
    onChange(undefined, undefined);
  };

  // Check if filter is active
  const isFilterActive = minValue !== undefined || maxValue !== undefined;

  return (
    <div className='w-full space-y-4'>
      <div className='flex justify-between items-center'>
        <Label className='text-sm font-medium'>{label}</Label>
        {isFilterActive && (
          <Button
            variant='ghost'
            size='sm'
            onClick={clearRange}
            className='h-6 w-6 p-0'
          >
            <X className='h-3 w-3' />
          </Button>
        )}
      </div>

      <div className='px-2 pt-2'>
        <Slider
          value={[displayMinValue, displayMaxValue]}
          min={actualMin}
          max={actualMax}
          step={1}
          onValueChange={handleSliderChange}
          className='w-full'
        />
      </div>

      <div className='flex justify-between items-center text-xs text-muted-foreground px-2'>
        <span>{displayMinValue}</span>
        <span>{displayMaxValue}</span>
      </div>

      {isFilterActive && (
        <p className='text-xs text-muted-foreground text-center'>
          {getRangeDisplayText()}
        </p>
      )}
    </div>
  );
};
