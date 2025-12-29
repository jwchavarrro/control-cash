/**
 * @file Breadcrumbs component
 * @description Componente para mostrar las breadcrumbs de la página actual
 * @module components/atomic-design/organism/navigation/breadcrumb
 */

'use client'

import { Breadcrumb, BreadcrumbList } from '@/components/ui/breadcrumb'

// Import of hooks
import {
  useBreadcrumbs,
  useBreadcrumbProcessing,
} from '@/components/atomic-design/organism/navigation/breadcrumb/hooks'

// Import of fragments
import {
  BreadcrumbItemRenderer,
  BreadcrumbEllipsisMenu,
} from '@/components/atomic-design/organism/navigation/breadcrumb/fragments'

interface BreadcrumbsProps {
  showEllipsisMenu?: boolean
  maxVisibleItems?: number
  disabledLabels?: string[]
}

export const Breadcrumbs = ({
  showEllipsisMenu = false,
  maxVisibleItems = 4,
  disabledLabels = [],
}: BreadcrumbsProps) => {
  const breadcrumbItems = useBreadcrumbs()

  const { visibleItems, ellipsisItems, shouldShowEllipsis } =
    useBreadcrumbProcessing({
      items: breadcrumbItems || [],
      disabledLabels,
      showEllipsisMenu,
      maxVisibleItems,
    })

  if (!breadcrumbItems || breadcrumbItems.length === 0) return null

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center gap-1">
        {visibleItems.map((item, index) => (
          <BreadcrumbItemRenderer
            key={item.id}
            item={item}
            isLast={index === visibleItems.length - 1}
            showSeparator={index > 0}
          />
        ))}
        {shouldShowEllipsis && (
          <BreadcrumbEllipsisMenu ellipsisItems={ellipsisItems} />
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
