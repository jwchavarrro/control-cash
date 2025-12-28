/**
 * @file config-columns.ts
 * @description Configuración de las columnas de la tabla de transacciones
 * @module components/pages/dashboard/transactions/table/config-columns
 */

// Import of types
import type {
  ColumnConfig,
  RecordEntity,
} from '@/components/atomic-design/organism/generic-table/utils/types'
import type { Transaction } from '@/lib/api/types'

export const CONFIG_COLUMNS: ColumnConfig<RecordEntity<Transaction>>[] = [
  {
    id: 'title',
    header: 'Title',
    enableSorting: true,
  },
  {
    id: 'amount',
    header: 'Amount',
    enableSorting: true,
  },
  {
    id: 'type',
    header: 'Type',
    enableSorting: true,
  },
  {
    id: 'category',
    header: 'Category',
    enableSorting: true,
  },
  {
    id: 'date',
    header: 'Date',
    enableSorting: true,
    meta: {
      isDate: true,
    },
  },
  {
    id: 'description',
    header: 'Description',
    enableSorting: true,
  },
]
