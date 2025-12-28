/**
 * @file types.ts
 * @description Tipos del componente GenericTable
 * @module components/atomic-design/organism/generic-table/utils/types
 */

import { type ColumnDef, type SortingState } from '@tanstack/react-table'
import { type ReactNode } from 'react'

export interface ColumnConfigMeta {
  isDate?: boolean
  isNumber?: boolean
}

export type StrictKeys<T> = keyof {
  [K in keyof T as string extends K
    ? never
    : number extends K
      ? never
      : K]: T[K]
}

export interface ColumnConfig<
  TData extends Record<string, unknown>,
> extends Omit<
  ColumnDef<TData, unknown>,
  | 'id'
  | 'accessorKey'
  | 'header'
  | 'cell'
  | 'enableSorting'
  | 'enableGlobalFilter'
  | 'meta'
> {
  id: StrictKeys<TData> | `_${string}`
  header: string | ReactNode
  enableSorting?: boolean
  cell?: ColumnDef<TData, unknown>['cell']
  meta?: ColumnConfigMeta
}

export interface ActionItem<TData extends Record<string, unknown>> {
  component: React.ComponentType<{ row: TData }>
}

export interface UseGenericTableProps<TData extends Record<string, unknown>> {
  queryFn: () => Promise<TData[]>
  columns: ColumnConfig<TData>[]
  initialPageSize?: number
  initialSort?: SortingState
  queryKey?: unknown[]
  enabled?: boolean
  actionsColumn?: {
    actions: ActionItem<TData>[]
    position?: 'start' | 'end'
    header?: string
  }
}

export interface GenericTableProps<
  TData extends Record<string, unknown>,
> extends UseGenericTableProps<TData> {
  title: string
  newButton?: {
    text: string
    path?: string
    onClick?: () => void | Promise<void>
    icon?: ReactNode
  }
}
