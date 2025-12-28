/**
 * @file page-header.tsx
 * @description Componente de la cabecera de la página del componente GenericTable
 * @module components/atomic-design/organism/generic-table/components/page-header
 */

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

// Import of components custom
import { Title } from '@/components/atomic-design/atoms'
import { NewButton } from '@/components/atomic-design/organism/generic-table/components/new-button'

import type { NewButtonProps } from '@/components/atomic-design/organism/generic-table/utils/types'

interface PageHeaderProps {
  title?: string
  globalFilter: string
  setGlobalFilter: (value: string) => void
  newButton?: NewButtonProps
}

export const PageHeaderComponent = ({
  title,
  globalFilter,
  setGlobalFilter,
  newButton,
}: PageHeaderProps) => {
  return (
    <div className="space-y-4">
      {title && (
        <Title level={3} color="primary">
          {title}
        </Title>
      )}
      <div className="flex items-center justify-between">
        {/* Global filter */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Buscar"
              value={globalFilter ?? ''}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setGlobalFilter(event.target.value)
              }
              className="pl-8"
            />
          </div>
        </div>

        {/* New button */}
        {newButton && <NewButton newButton={newButton} />}
      </div>
    </div>
  )
}
