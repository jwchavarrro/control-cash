/**
 * Message.tsx
 * @description: Componente molecular que combina un icono, título y descripción para mostrar mensajes.
 */

import { ComponentProps } from 'react'
import { type LucideIcon } from 'lucide-react'

// Import of components custom
import { Text, Title } from '@/components/atomic-design/atoms'

// Import of utils
import { cn } from '@/lib/utils'

export interface MessageProps {
  icon: LucideIcon
  iconProps?: ComponentProps<LucideIcon>
  title?: string
  description?: string
  className?: string
}

export const Message = ({
  icon: Icon,
  iconProps,
  title,
  description,
  className,
}: MessageProps) => {
  return (
    <div className={cn('flex flex-col items-center opacity-50', className)}>
      <Icon className="text-muted-foreground/10 size-96" {...iconProps} />
      <div className="flex flex-col items-center">
        {title && <Title level={4}>{title}</Title>}
        {description && <Text className="m-0! p-0!">{description}</Text>}
      </div>
    </div>
  )
}
