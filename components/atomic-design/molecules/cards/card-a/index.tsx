/**
 * @file card-a.tsx
 * @description Componente de card A
 * @module components/atomic-design/molecules/cards/card-a/index
 */

import { Card } from '@/components/atomic-design/molecules/cards/card'
import { Text, Title } from '@/components/atomic-design/atoms'

interface CardAProps {
  readonly icon: React.ReactNode
  readonly title: string
  readonly description: string
}

export const CardA = ({ icon, title, description }: CardAProps) => {
  return (
    <Card as="button">
      <div>
        <div>{icon}</div>
        <Title level={4} variant="accent">
          {title}
        </Title>
        <Text variant="muted">{description}</Text>
      </div>
    </Card>
  )
}
