import * as React from 'react'
import {
  TypographyH1 as BaseH1,
  TypographyH2 as BaseH2,
  TypographyH3 as BaseH3,
  TypographyH4 as BaseH4,
} from '@/components/ui/typography'
import { cn } from '@/lib/utils'

/**
 * Componentes de títulos personalizados que extienden Typography de shadcn/ui
 * Incluye fuente personalizada para títulos
 */

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Nivel del título */
  readonly level?: 1 | 2 | 3 | 4
  /** Variante del título */
  readonly variant?: 'default' | 'accent' | 'gradient'
  /** Color personalizado */
  readonly color?: 'default' | 'primary' | 'secondary' | 'accent'
}

export function Title({
  level = 1,
  variant = 'default',
  color = 'default',
  className,
  children,
  ...props
}: TitleProps) {
  const variantStyles = {
    accent: 'text-primary',
    gradient:
      'bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent',
    default: '',
  }

  const colorStyles = {
    primary: 'text-primary',
    secondary: 'text-secondary-foreground',
    accent: 'text-accent-foreground',
    default: '',
  }

  // Fuente para títulos
  const titleFont = 'font-title'

  const baseClassName = cn(
    titleFont,
    variantStyles[variant],
    colorStyles[color],
    className
  )

  switch (level) {
    case 2:
      return (
        <BaseH2 className={baseClassName} {...props}>
          {children}
        </BaseH2>
      )
    case 3:
      return (
        <BaseH3 className={baseClassName} {...props}>
          {children}
        </BaseH3>
      )
    case 4:
      return (
        <BaseH4 className={baseClassName} {...props}>
          {children}
        </BaseH4>
      )
    case 1:
    default:
      return (
        <BaseH1 className={baseClassName} {...props}>
          {children}
        </BaseH1>
      )
  }
}
