import * as React from 'react'
import {
  TypographyP as BaseP,
  TypographyLead as BaseLead,
  TypographyLarge as BaseLarge,
  TypographySmall as BaseSmall,
  TypographyMuted as BaseMuted,
} from '@/components/ui/typography'
import { cn } from '@/lib/utils'

/**
 * Componentes de texto personalizados que extienden Typography de shadcn/ui
 */

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Variante del texto */
  readonly variant?: 'p' | 'lead' | 'large' | 'small' | 'muted'
  /** Color personalizado */
  readonly color?: 'default' | 'primary' | 'secondary' | 'accent'
}

export function Text({
  variant = 'p',
  color = 'default',
  className,
  children,
  ...props
}: TextProps) {
  const colorStyles = {
    primary: 'text-primary',
    secondary: 'text-secondary-foreground',
    accent: 'text-accent-foreground',
    default: '',
  }

  // Fuente para texto
  const textFont = 'font-text'

  const baseClassName = cn(textFont, colorStyles[color], className)

  switch (variant) {
    case 'lead':
      return (
        <BaseLead className={baseClassName} {...props}>
          {children}
        </BaseLead>
      )
    case 'large':
      return (
        <BaseLarge className={baseClassName} {...props}>
          {children}
        </BaseLarge>
      )
    case 'small':
      return (
        <BaseSmall className={baseClassName} {...props}>
          {children}
        </BaseSmall>
      )
    case 'muted':
      return (
        <BaseMuted className={baseClassName} {...props}>
          {children}
        </BaseMuted>
      )
    default:
      return (
        <BaseP className={baseClassName} {...props}>
          {children}
        </BaseP>
      )
  }
}
