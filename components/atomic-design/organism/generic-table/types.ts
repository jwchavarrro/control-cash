import { type ColumnDef, type SortingState } from '@tanstack/react-table';
import { type ReactNode } from 'react';


export interface ColumnConfigMeta {
  isDate?: boolean;
  isNumber?: boolean;
}


export type StrictKeys<T> = keyof {
  [K in keyof T as string extends K
    ? never
    : number extends K
      ? never
      : K]: T[K];
};


export interface ColumnConfig<TData extends Record<string, unknown>>
  extends Omit<
    ColumnDef<TData, unknown>,
    | 'id'
    | 'accessorKey' 
    | 'header'
    | 'cell'
    | 'enableSorting'
    | 'enableGlobalFilter' 
    | 'meta'
  > {

 
  id: StrictKeys<TData> | `_${string}`;
  /** The header label displayed for the column. */
  header: string | ReactNode;
  /** Enable/disable sorting for this column (Default: true). */
  enableSorting?: boolean;
  /** Optional custom cell rendering component. Uses TanStack's `flexRender`. */
  cell?: ColumnDef<TData, unknown>['cell'];
  /** Optional custom metadata accessible via `column.columnDef.meta`. */
  meta?: ColumnConfigMeta;
}

// --- Row Actions Configuration ---

/**
 * Configuration for a row action item.
 * Each action item is a React component that receives the row data.
 */
export interface ActionItem<TData extends Record<string, unknown>> {
  component: React.ComponentType<{ row: TData }>;
}

// --- GenericTable Component Props ---

/** Props for the useGenericTable hook */
export interface UseGenericTableProps<TData extends Record<string, unknown>> {
  /** Function to fetch data. Should return a Promise that resolves to TData[]. */
  queryFn: () => Promise<TData[]>;
  /** Array of column configurations defining the table structure and behavior. Required. */
  columns: ColumnConfig<TData>[];
  /** Initial number of rows per page. (Default: 10) */
  initialPageSize?: number;
  /** Optional: Initial sorting state for the table. */
  initialSort?: SortingState; // e.g., [{ id: 'name', desc: false }]
  /** Optional: Custom React Query key. If not provided, a default key will be generated. */
  queryKey?: unknown[];
  /** Optional: Enable/disable the query. (Default: true) */
  enabled?: boolean;
  /** Optional: Configuration for row actions column. */
  actionsColumn?: {
    actions: ActionItem<TData>[];
    position?: 'start' | 'end'; // Default: 'end'
    header?: string; // Default: 'Actions'
  };
}

/** Props for the GenericTable component (v1 Scope) */
export interface GenericTableProps<TData extends Record<string, unknown>>
  extends UseGenericTableProps<TData> {
  /** Title displayed above the table. Required. */
  title: string;
  /** Configuration for the 'Add New' button shown in the header. */
  newButton?: {
    text: string;
    path?: string; // Target URL for navigation (optional if onClick is provided)
    onClick?: () => void | Promise<void>; // Custom action function (optional if path is provided)
    icon?: ReactNode; // Icon component (e.g., <PlusIcon />)
  };
}
