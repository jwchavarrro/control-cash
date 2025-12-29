/**
 * @file config-actions.ts
 * @description Configuración de las acciones de la tabla de transacciones
 * @module components/pages/dashboard/transactions/table/config-actions
 */

// Import of components custom
import {
  EditAction,
  DeleteAction,
} from '@/components/pages/dashboard/transactions/table/fragments'

export const CONFIG_ACTIONS = () => [
  {
    component: EditAction,
  },
  {
    component: DeleteAction,
  },
]
