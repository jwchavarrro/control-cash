/**
 * @file utils/functions.ts
 * @description Funciones utilitarias
 * @module utils/functions
 */

/**
 * Obtiene la primera palabra de un string.
 * @param {string} text - El texto del que extraer la primera palabra.
 * @returns {string} - La primera palabra o una cadena vacía si no hay palabras.
 */
export function getFirstWord(text: string): string {
  if (!text) return '';
  const regex = /^\S+/;
  const match = regex.exec(text.trim());
  return match ? match[0] : '';
}
