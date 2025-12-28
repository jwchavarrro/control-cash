/**
 * @file sort-indicator.tsx
 * @description Componente genérico para mostrar el indicador de ordenamiento
 * @module components/atomic-design/organism/generic-table/components/sort-indicator
 */

import { ChevronDown, ChevronUp, Minus } from 'lucide-react'

export type SortDirection = false | 'asc' | 'desc'

interface SortIndicatorProps {
  sortDirection: SortDirection
  className?: string
}

export const SortIndicator = ({
  sortDirection,
  className = 'h-4 w-4',
}: SortIndicatorProps) => {
  if (sortDirection === 'asc') {
    return <ChevronUp className={className} />
  }

  if (sortDirection === 'desc') {
    return <ChevronDown className={className} />
  }

  return <Minus className={className} />
}
