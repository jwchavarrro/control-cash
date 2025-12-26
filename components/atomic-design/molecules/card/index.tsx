import * as React from 'react'
import {
  Card as BaseCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Title, Text } from '@/components/atomic-design/atoms'

/**
 * Molecule: Card
 * Componente compuesto que extiende el Card de shadcn/ui
 * Combina Card base con Heading, Text y Button personalizados
 */

interface CardProps extends React.ComponentProps<typeof BaseCard> {
  readonly title?: string
  readonly description?: string
  readonly children?: React.ReactNode
  readonly buttonText?: string
  readonly onButtonClick?: () => void
  readonly buttonVariant?: React.ComponentProps<typeof Button>['variant']
  readonly showHeaderAction?: boolean
  readonly headerAction?: React.ReactNode
}

export function Card({
  title,
  description,
  children,
  buttonText,
  onButtonClick,
  buttonVariant = 'default',
  showHeaderAction = false,
  headerAction,
  className,
  ...props
}: CardProps) {
  return (
    <BaseCard className={className} {...props}>
      {(title || description || showHeaderAction) && (
        <CardHeader>
          {title && (
            <CardTitle>
              <Title level={4} variant="accent">
                {title}
              </Title>
            </CardTitle>
          )}
          {description && (
            <CardDescription>
              <Text variant="muted">{description}</Text>
            </CardDescription>
          )}
          {showHeaderAction && headerAction && (
            <div className="ml-auto">{headerAction}</div>
          )}
        </CardHeader>
      )}
      {children && <CardContent>{children}</CardContent>}
      {buttonText && (
        <CardFooter>
          <Button variant={buttonVariant} onClick={onButtonClick}>
            {buttonText}
          </Button>
        </CardFooter>
      )}
    </BaseCard>
  )
}
