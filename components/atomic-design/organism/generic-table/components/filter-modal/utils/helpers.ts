/* eslint-disable complexity */
// Helper functions for filters
import { type FilterFn, type Row } from '@tanstack/react-table';

// Helper functions to clean up nested ternaries
export const getStartDate = (value: unknown): Date | undefined => {
  if (!Array.isArray(value) || !value[0]) return undefined;
  return new Date(value[0] as string);
};

export const getEndDate = (value: unknown): Date | undefined => {
  if (!Array.isArray(value) || !value[1]) return undefined;
  return new Date(value[1] as string);
};

export const getMinValue = (value: unknown): number | undefined => {
  if (!Array.isArray(value) || value[0] === null) return undefined;
  return Number(value[0]);
};

export const getMaxValue = (value: unknown): number | undefined => {
  if (!Array.isArray(value) || value[1] === null) return undefined;
  return Number(value[1]);
};

// Helper to create date range filter value
export const createDateRangeValue = (
  start: Date | undefined,
  end: Date | undefined
): unknown => {
  if (!start && !end) return undefined;

  return [start ? start.toISOString() : null, end ? end.toISOString() : null];
};

// Helper to create number range filter value
export const createNumberRangeValue = (
  min: number | undefined,
  max: number | undefined
): unknown => {
  if (min === undefined && max === undefined) return undefined;

  return [min !== undefined ? min : null, max !== undefined ? max : null];
};

// Helper to convert filter value to string array
export const toStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map(String);
  }
  return [];
};

// Custom date range filter function for TanStack Table
export const dateRangeFilterFn = ((
  row: Row<Record<string, unknown>>,
  columnId: string,
  filterValue: unknown
) => {
  // If no filter value, return true (show all)
  if (!filterValue || !Array.isArray(filterValue)) return true;

  // Get cell value (could be string, Date, or null/undefined)
  const cellValue = row.getValue(columnId);
  if (!cellValue) return false;

  // Convert cell value to Date object if it's a string
  let cellDate: Date;
  try {
    cellDate =
      cellValue instanceof Date ? cellValue : new Date(String(cellValue));

    // Check if valid date
    if (isNaN(cellDate.getTime())) return false;
  } catch {
    return false; // Invalid date format
  }

  // Get start and end date from filter value
  const startDate = filterValue[0] ? new Date(String(filterValue[0])) : null;
  const endDate = filterValue[1] ? new Date(String(filterValue[1])) : null;

  // If both start and end date are provided, check if cell date is within range
  if (startDate && endDate) {
    return cellDate >= startDate && cellDate <= endDate;
  }

  // If only start date is provided, check if cell date is after start date
  if (startDate) {
    return cellDate >= startDate;
  }

  // If only end date is provided, check if cell date is before end date
  if (endDate) {
    return cellDate <= endDate;
  }

  // Default to true if no valid filter criteria
  return true;
}) as FilterFn<Record<string, unknown>>;

// Custom number range filter function for TanStack Table
export const numberRangeFilterFn = ((
  row: Row<Record<string, unknown>>,
  columnId: string,
  filterValue: unknown
) => {
  // If no filter value, return true (show all)
  if (!filterValue || !Array.isArray(filterValue)) return true;

  // Get cell value
  const cellValue = row.getValue(columnId);
  if (cellValue === null || cellValue === undefined) return false;

  // Convert to number
  const cellNumber = Number(cellValue);
  if (isNaN(cellNumber)) return false;

  // Get min and max from filter value
  const min = filterValue[0] !== null ? Number(filterValue[0]) : null;
  const max = filterValue[1] !== null ? Number(filterValue[1]) : null;

  // Check if cell value is within range
  if (min !== null && max !== null) {
    return cellNumber >= min && cellNumber <= max;
  }

  if (min !== null) {
    return cellNumber >= min;
  }

  if (max !== null) {
    return cellNumber <= max;
  }

  // Default to true if no valid filter criteria
  return true;
}) as FilterFn<Record<string, unknown>>;

// Custom multi-select filter function for TanStack Table (using OR logic)
export const multiSelectFilterFn = ((
  row: Row<Record<string, unknown>>,
  columnId: string,
  filterValue: unknown
) => {
  // If no filter value, return true (show all)
  if (!filterValue || !Array.isArray(filterValue) || filterValue.length === 0)
    return true;

  // Get cell value
  const cellValue = row.getValue(columnId);
  if (cellValue === null || cellValue === undefined) return false;

  // Convert to string for comparison
  const cellString = String(cellValue).toLowerCase();

  // Check if the cell value matches any of the selected filter values (OR logic)
  return filterValue.some(
    (value) => String(value).toLowerCase() === cellString
  );
}) as FilterFn<Record<string, unknown>>;
