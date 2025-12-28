/**
 * @file config-actions.ts
 * @description Configuración de las acciones de la tabla de usuarios
 * @module components/pages/dashboard/master/users/table/config-actions
 */

// Import of components custom
import {
  EditAction,
  DeleteAction,
} from '@/components/pages/dashboard/master/users/table/fragments'

export const CONFIG_ACTIONS = () => [
  {
    component: EditAction,
  },
  {
    component: DeleteAction,
  },
]
