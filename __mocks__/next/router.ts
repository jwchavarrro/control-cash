/**
 * Mock genérico de Next.js Router para tests
 *
 * @module __mocks__/next/router
 */

export const useRouter = () => ({
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
})

export const usePathname = () => '/'

export const useSearchParams = () => new URLSearchParams()
