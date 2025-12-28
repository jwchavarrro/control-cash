/**
 * Message.tsx
 * @description: Componente molecular que combina un icono, título y descripción para mostrar mensajes.
 */

import type { ComponentProps } from 'react'
import type { LucideIcon } from 'lucide-react'

// Import of components custom
import { Text, Title } from '@/components/atomic-design/atoms'

// Import of utils
import { cn } from '@/lib/utils'

interface MessageProps {
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
    <div
      className={cn('flex flex-col items-center gap-2 opacity-50', className)}
    >
      <Icon className="text-muted-foreground size-20" {...iconProps} />
      <div className="flex flex-col items-center">
        {title && <Title level={4}>{title}</Title>}
        {description && (
          <Text className="m-0! max-w-sm p-0! text-center">{description}</Text>
        )}
      </div>
    </div>
  )
}
