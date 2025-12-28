/**
 * @file config-columns.ts
 * @description Configuración de las columnas de la tabla de usuarios
 * @module components/pages/dashboard/master/users/table/config-columns
 */

// Import of types
import type { ColumnConfig, RecordEntity } from '@/components/atomic-design/organism/generic-table/utils/types'
import type { User } from '@/lib/api/types'

export const CONFIG_COLUMNS: ColumnConfig<RecordEntity<User>>[] = [
  {
    id: 'id',
    header: 'Consolidated ID',
    enableSorting: true,
  },
  {
    id: 'name',
    header: 'Names',
    enableSorting: true,
  },
  {
    id: 'email',
    header: 'Email',
    enableSorting: true,
  },
  {
    id: 'createdAt',
    header: 'Creation Date',
    enableSorting: true,
    meta: {
      isDate: true,
    },
  },
]
