/**
 * Mocks genéricos reutilizables para tests
 *
 * @module __mocks__
 *
 * @description
 * Este archivo exporta todos los mocks genéricos que pueden ser
 * reutilizados en los tests del proyecto.
 *
 * @example
 * ```ts
 * // En tu archivo de test
 * import { mockNextLinkFactory, mockNextRouterFactory } from '@/__mocks__/helpers'
 *
 * jest.mock('next/link', mockNextLinkFactory)
 * jest.mock('next/router', mockNextRouterFactory)
 * ```
 */

// Re-exportar helpers de mocks
export {
  mockNextLinkFactory,
  mockNextRouterFactory,
  mockNextNavigationFactory,
} from './helpers'

// Re-exportar mocks de Next.js (para uso directo si es necesario)
export { default as mockNextLink } from './next/link'
export * as mockNextRouter from './next/router'
export * as mockNextNavigation from './next/navigation'
