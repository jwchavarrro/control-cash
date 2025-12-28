/**
 * @file index.tsx
 * @description Componente de header
 * @module components/atomic-design/molecules/headers/index
 */

// Import of utilities
import { cn } from '@/lib/utils'

// Import of components custom
import { Title, Text } from '@/components/atomic-design/atoms'

interface HeaderProps {
  // Title props
  title: string
  level?: 1 | 2 | 3 | 4
  titleVariant?: 'default' | 'accent' | 'gradient'
  titleColor?: 'default' | 'primary' | 'secondary' | 'accent'
  titleAlign?: 'left' | 'center' | 'right'
  titleClassName?: string
  // Text props
  text?: string
  textVariant?: 'p' | 'lead' | 'large' | 'small' | 'muted'
  textColor?: 'default' | 'primary' | 'secondary' | 'accent'
  textAlign?: 'left' | 'center' | 'right'
  textClassName?: string
  // Common props
  children?: React.ReactNode
  className?: string
}

export const Header = ({
  title,
  text,
  children,
  className,
  // Title props
  level = 1,
  titleVariant = 'default',
  titleColor = 'primary',
  titleAlign = 'left',
  titleClassName = '',
  // Text props
  textVariant = 'p',
  textColor = 'default',
  textAlign = 'left',
  textClassName = '',
}: HeaderProps) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <section className={cn('space-y-2', className)}>
      {/* Title and text */}
      <div className="space-y-2">
        <Title
          level={level}
          variant={titleVariant}
          color={titleColor}
          className={cn(alignClasses[titleAlign], 'm-0! p-0!', titleClassName)}
        >
          {title}
        </Title>
        {text && (
          <Text
            variant={textVariant}
            color={textColor}
            className={cn(alignClasses[textAlign], 'm-0! p-0!', textClassName)}
          >
            {text}
          </Text>
        )}
      </div>

      {/* Children */}
      {children}
    </section>
  )
}
