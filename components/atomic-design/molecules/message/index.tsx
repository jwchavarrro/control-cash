/**
 * Message.tsx
 * @description: Componente molecular que combina un icono, título y descripción para mostrar mensajes.
 */

// Import of components custom
import { Text, Title } from '@/components/atomic-design/atoms'

// Import of utils
import { cn } from '@/lib/utils'

export interface MessageProps {
  icon: React.ReactNode
  title?: string
  description?: string
  className?: string
}

export const Message = ({
  icon,
  title,
  description,
  className,
}: MessageProps) => {
  return (
    <div className={cn('flex flex-col items-center opacity-50', className)}>
      {icon}
      <div className="flex flex-col items-center">
        {title && <Title level={4}>{title}</Title>}
        {description && <Text className="m-0! p-0!">{description}</Text>}
      </div>
    </div>
  )
}
