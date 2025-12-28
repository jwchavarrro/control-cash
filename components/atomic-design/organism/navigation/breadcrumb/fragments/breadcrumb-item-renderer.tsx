import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { SlashIcon } from 'lucide-react'

// Import of components custom
import { Text } from '@/components/atomic-design/atoms'

// Import of types
import { BreadcrumbItem as BreadcrumbItemType } from '@/components/atomic-design/organism/navigation/breadcrumb/utils/types'

interface BreadcrumbItemRendererProps {
  item: BreadcrumbItemType
  isLast: boolean
  showSeparator: boolean
}

export const BreadcrumbItemRenderer = ({
  item,
  isLast,
  showSeparator,
}: BreadcrumbItemRendererProps) => {
  const getTextClassName = () => {
    const classes: string[] = []

    if (item.disabled) {
      classes.push('text-muted-foreground cursor-not-allowed opacity-60')
    } else if (!isLast) {
      classes.push('hover:text-primary')
    }

    if (isLast) {
      classes.push('font-semibold')
    }

    return classes.length > 0 ? classes.join(' ') : undefined
  }

  const getBreadcrumbItemClassName = () =>
    isLast ? 'animate-in slide-in-from-left-10 duration-300 ease-in-out' : ''

  const renderContent = () => {
    const textProps = {
      variant: 'p' as const,
      className: getTextClassName(),
      children: item.label,
    }

    if (item.active || item.disabled) {
      return (
        <BreadcrumbPage>
          <Text {...textProps} />
        </BreadcrumbPage>
      )
    }

    return (
      <BreadcrumbLink href={item.href || '#'}>
        <Text {...textProps} />
      </BreadcrumbLink>
    )
  }

  return (
    <div key={item.id} className="flex items-center gap-1">
      {showSeparator && (
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
      )}
      <BreadcrumbItem className={getBreadcrumbItemClassName()}>
        {renderContent()}
      </BreadcrumbItem>
    </div>
  )
}
