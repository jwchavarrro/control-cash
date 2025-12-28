/**
 * @file card-a.tsx
 * @description Componente de card A
 * @module components/atomic-design/molecules/cards/card-a/index
 */

'use client'

import { useRouter } from 'next/navigation'

// Import of components custom
import { Card } from '@/components/atomic-design/molecules/cards/card'
import { Text, Title } from '@/components/atomic-design/atoms'


interface CardAProps {
  readonly icon: React.ReactNode
  readonly title: string
  readonly description: string
  readonly link: string
}

export const CardA = ({ icon, title, description, link }: CardAProps) => {

  // Hooks
  const router = useRouter();

  // Handlers
  /**
   * @function handleClick
   * @description Handler para el click del card
   * @param {string} link - La ruta a la que se redirigirá
   */
  const handleClick = (link: string) => {
    router.push(link)
  }
  return (
    <Card
      as="button"
      className="relative hover:bg-primary/10 border-primary overflow-hidden transition-all duration-300"
      onClick={() => handleClick(link)}
    >
      {/* children */}
      {/* icon */}
      <div className="bg-primary text-primary-foreground absolute -top-3 -right-3 flex size-20 items-center justify-center rounded-full">
        {icon}
      </div>

      {/* content */}
      <div className="flex max-w-md flex-col gap-2 p-4">
        <Title level={3} className="text-left">
          {title}
        </Title>
        <Text variant="muted" className="text-left">
          {description}
        </Text>
      </div>
    </Card>
  )
}
