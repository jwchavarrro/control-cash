/**
 * @file edit-action.tsx
 * @description Componente de acción de edición
 * @module components/pages/dashboard/master/users/table/fragments/edit-action
 */

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

// Import of types
import type { ComponentProps } from 'react'
import type { LucideIcon } from 'lucide-react'

interface ButtonActionProps {
  tooltipMessage: string
  icon: LucideIcon
  iconProps?: ComponentProps<LucideIcon>
}

export const ButtonAction = ({
  tooltipMessage,
  icon: Icon,
  iconProps,
  ...props
}: ButtonActionProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-primary/10 cursor-pointer"
          {...props}
        >
          <Icon className="size-5" {...iconProps} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltipMessage}</TooltipContent>
    </Tooltip>
  )
}
