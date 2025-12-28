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
    id: 'id',
    header: 'Transaction ID',
    enableSorting: true,
  },
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
    id: 'date',
    header: 'Date',
    enableSorting: true,
    meta: {
      isDate: true,
    },
  },
]
