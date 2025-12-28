/**
 * @file constants.ts
 * @description Constantes para la página de transacciones
 * @module components/pages/dashboard/transactions/utils/constants
 */

import { ENUM_TRANSACTION_TYPE } from "@/lib/api";

/**
 * @constant TAB_TRANSACTIONS_OPTIONS
 * @description Opciones de tab para la página de transacciones
 */
export const TAB_TRANSACTIONS_OPTIONS = {
  INCOME: ENUM_TRANSACTION_TYPE.INCOME,
  EXPENSE: ENUM_TRANSACTION_TYPE.EXPENSE,
} as const;