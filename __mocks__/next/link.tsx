/**
 * Mock genérico de Next.js Link para tests
 *
 * @module __mocks__/next/link
 */

import * as React from 'react'

interface LinkProps {
  readonly children: React.ReactNode
  readonly href: string
  readonly className?: string
  readonly [key: string]: unknown
}

/**
 * Mock del componente Link de Next.js
 * Renderiza un <a> simple para tests
 */
export default function Link({
  children,
  href,
  className,
  ...props
}: Readonly<LinkProps>) {
  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  )
}
