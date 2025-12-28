/**
 * @file new-button.tsx
 * @description Componente del botón "Nuevo" para GenericTable
 * @module components/atomic-design/organism/generic-table/components/new-button
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Import of types
import type { NewButtonProps } from '@/components/atomic-design/organism/generic-table/utils/types'

export const NewButton = ({ newButton }: { newButton: NewButtonProps }) => {
  if (!newButton) return null

  if (newButton.path) {
    return (
      <Button asChild>
        <Link href={newButton.path}>{newButton.text}</Link>
      </Button>
    )
  }

  if (newButton.onClick) {
    return <Button onClick={newButton.onClick}>{newButton.text}</Button>
  }

  return null
}
