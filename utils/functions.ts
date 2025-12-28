/**
 * @file utils/functions.ts
 * @description Funciones utilitarias
 * @module utils/functions
 */

/**
 * Obtiene las primeras palabras de un string.
 * @param {string} text - El texto del que extraer las palabras.
 * @param {number} count - Cantidad de palabras a mostrar (por defecto 1).
 * @returns {string} - Las palabras solicitadas o una cadena vacía si no hay palabras.
 */
export function getFirstsWords(text: string, count: number = 1): string {
  if (!text) return ''
  const trimmed = text.trim()
  if (!trimmed) return ''

  const words = trimmed.split(/\s+/)
  return words.slice(0, count).join(' ')
}
