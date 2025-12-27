/**
 * Tipos globales para jest-dom matchers
 * 
 * @module types/jest-dom
 */

import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveClass(...classNames: string[]): R
      toHaveValue(value: string | number): R
      toBeRequired(): R
    }
  }
}

export {}

