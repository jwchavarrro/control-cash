/**
 * @file dialog-actions.tsx
 * @description Componente de acciones de diálogo
 * @module components/atomic-design/molecules/dialog/dialog-actions
 */

import { Button } from '@/components/ui/button'
import { ComponentProps } from 'react'

// Import of utilities
import { KEYWORDS } from '@/config'
import { cn } from '@/lib/utils'

export interface DialogActionsProps extends Omit<
  ComponentProps<typeof Button>,
  'text' | 'onClick'
> {
  extraClassName?: string
  showCancel?: boolean
  showConfirm?: boolean
  cancelText?: string
  confirmText?: string
  onCancel?: () => void
  onConfirm?: () => void
}

export const DialogActions = ({
  extraClassName,
  showCancel = true,
  showConfirm = true,
  cancelText = KEYWORDS.COMMON.CANCEL,
  confirmText = KEYWORDS.COMMON.CONFIRM,
  onCancel,
  onConfirm,
  ...buttonProps
}: DialogActionsProps) => {
  return (
    <div
      className={cn('flex items-center justify-center gap-2', extraClassName)}
    >
      {showCancel && (
        <Button variant="outline" onClick={onCancel}>
          {cancelText}
        </Button>
      )}
      {showConfirm && (
        <Button onClick={onConfirm} {...buttonProps}>
          {confirmText}
        </Button>
      )}
    </div>
  )
}
