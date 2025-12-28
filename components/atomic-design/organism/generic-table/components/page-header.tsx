/**
 * @file page-header.tsx
 * @description Componente de la cabecera de la página del componente GenericTable
 * @module components/atomic-design/organism/generic-table/components/page-header
 */


import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PlusCircle, Search } from 'lucide-react'
import Link from 'next/link'

// Import of types
import { type ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  globalFilter: string
  setGlobalFilter: (value: string) => void
  newButton?: {
    text: string
    path?: string
    onClick?: () => void | Promise<void>
    icon?: ReactNode
  }
}

const NewButton = ({
  newButton,
}: {
  newButton: {
    text: string
    path?: string
    onClick?: () => void | Promise<void>
    icon?: ReactNode
  }
}) => {
  if (!newButton) return null

  if (newButton.path) {
    return (
      <Link href={newButton.path} passHref>
        <Button variant="secondary" size="sm" className="h-8">
          {newButton.icon || <PlusCircle className="mr-2 h-4 w-4" />}
          {newButton.text}
        </Button>
      </Link>
    )
  }

  if (newButton.onClick) {
    return (
      <Button
        variant="secondary"
        size="sm"
        className="h-8"
        onClick={newButton.onClick}
      >
        {newButton.icon || <PlusCircle className="mr-2 h-4 w-4" />}
        {newButton.text}
      </Button>
    )
  }

  return null
}

export const PageHeaderComponent = ({
  title,
  globalFilter,
  setGlobalFilter,
  newButton,
}: PageHeaderProps) => {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>

      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Buscar"
              value={globalFilter ?? ''}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setGlobalFilter(event.target.value)
              }
              className="max-w-sm pl-8"
            />
          </div>
        </div>

        <div className="flex gap-2">
          {newButton && <NewButton newButton={newButton} />}
        </div>
      </div>
    </div>
  )
}
