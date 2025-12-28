/**
 * @file card.tsx
 * @description Componente de card
 * @module components/atomic-design/molecules/cards/card/index
 */

import { Card as BaseCard } from '@/components/ui/card'

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
  if (as === 'button') {
    return (
      <button
        type="button"
        className={cn(
          'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
          className
        )}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    )
  }

  return (
    <BaseCard className={className} {...(props as HTMLAttributes<HTMLDivElement>)}>
      {children}
    </BaseCard>
  )
}
