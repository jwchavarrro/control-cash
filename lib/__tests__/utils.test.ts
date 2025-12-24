import { cn } from '../utils'

describe('cn utility', () => {
  it('should merge class names correctly', () => {
    const result = cn('foo', 'bar')
    expect(result).toBe('foo bar')
  })

  it('should handle conditional classes', () => {
    const result = cn('foo', false && 'bar', 'baz')
    expect(result).toBe('foo baz')
  })

  it('should merge tailwind classes correctly', () => {
    const result = cn('p-2 p-4', 'p-6')
    expect(result).toBe('p-6')
  })
})

