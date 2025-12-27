/**
 * Funciones helper para configurar mocks en tests
 *
 * @module __mocks__/helpers
 */

import * as React from 'react'

/**
 * Factory function para mock de Next.js Link
 * Úsalo en jest.mock('next/link', mockNextLinkFactory)
 */
export const mockNextLinkFactory = () => {
  return function MockLink({
    children,
    href,
    className,
    ...props
  }: {
    children: React.ReactNode
    href: string
    className?: string
    [key: string]: unknown
  }) {
    return React.createElement('a', { href, className, ...props }, children)
  }
}

/**
 * Factory function para mock de Next.js Router (Pages Router)
 * Úsalo en jest.mock('next/router', mockNextRouterFactory)
 */
export const mockNextRouterFactory = () => ({
  useRouter: () => ({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    isPreview: false,
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
})

/**
 * Factory function para mock de Next.js Navigation (App Router)
 * Úsalo en jest.mock('next/navigation', mockNextNavigationFactory)
 */
export const mockNextNavigationFactory = () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => ({
    get: jest.fn(),
    getAll: jest.fn(),
    has: jest.fn(),
    keys: jest.fn(),
    values: jest.fn(),
    entries: jest.fn(),
    forEach: jest.fn(),
    toString: jest.fn(() => ''),
  }),
  useParams: () => ({}),
  useSelectedLayoutSegment: () => null,
  useSelectedLayoutSegments: () => [],
})
