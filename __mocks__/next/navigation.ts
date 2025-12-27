/**
 * Mock genérico de Next.js Navigation para tests
 *
 * @module __mocks__/next/navigation
 */

export const useRouter = () => ({
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  prefetch: jest.fn(),
})

export const usePathname = () => '/'

export const useSearchParams = () => ({
  get: jest.fn(),
  getAll: jest.fn(),
  has: jest.fn(),
  keys: jest.fn(),
  values: jest.fn(),
  entries: jest.fn(),
  forEach: jest.fn(),
  toString: jest.fn(() => ''),
})

export const useParams = () => ({})

export const useSelectedLayoutSegment = () => null

export const useSelectedLayoutSegments = () => []
