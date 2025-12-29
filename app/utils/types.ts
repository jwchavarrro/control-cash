/**
 * @file types.ts
 * @description Tipos para la aplicación
 * @module app/utils/types
 */

/**
 * @enum ENUM_ACTION_TYPE
 * @description Tipos de acción
 */
export enum ENUM_ACTION_TYPE {
  IDLE = 'IDLE',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  APPROVE = 'APPROVE',
  DECLINE = 'DECLINE',
}
