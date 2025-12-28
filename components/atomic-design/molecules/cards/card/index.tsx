/**
 * @file card.tsx
 * @description Componente de card
 * @module components/atomic-design/molecules/cards/card/index
 */

// Import of utilities
import { cn } from '@/lib/utils'

// Import of types
import type { ButtonHTMLAttributes, HTMLAttributes } from 'react'

type CardBaseProps = {
  readonly children?: React.ReactNode
  readonly className?: string
}

type CardAsButton = CardBaseProps & {
  as: 'button'
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CardBaseProps>

type CardAsDiv = CardBaseProps & {
  as?: 'div'
} & Omit<HTMLAttributes<HTMLDivElement>, keyof CardBaseProps>

export type CardProps = CardAsButton | CardAsDiv

export function Card({
  children,
  className,
  as = 'div',
  ...props
}: CardProps) {
  const baseClasses =
    'rounded-xl border min-h-20 shadow-lg'

  if (as === 'button') {
    return (
      <button
        type="button"
        className={cn('cursor-pointer', baseClasses, className)}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    )
  }

  return (
    <div
      className={cn(baseClasses, className)}
      {...(props as HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </div>
  )
}
