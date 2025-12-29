/**
 * @file dialog-footer.tsx
 * @description Componente de footer de diálogo
 * @module components/atomic-design/molecules/dialog/dialog-footer
 */

import { memo } from 'react';
import { DialogFooter as ShadcnDialogFooter } from '@/components/ui/dialog';

// Import of components custom
import { DialogActions, type DialogActionsProps } from './dialog-actions';

// Import of utilities
import { KEYWORDS } from '@/config';

export interface DialogFooterProps extends DialogActionsProps {
  footer?: React.ReactNode;
}

export const DialogFooter = memo<DialogFooterProps>(
  ({
    footer,
    showCancel = true,
    showConfirm = true,
    cancelText = KEYWORDS.COMMON.CANCEL,
    confirmText = KEYWORDS.COMMON.CONFIRM,
    onCancel,
    onConfirm,
    ...buttonProps
  }) => {
    // Retornar null si no hay contenido para mostrar
    if (!showCancel && !showConfirm && !footer) {
      return null
    }

    // Preparar props de acción
    const actionProps: DialogActionsProps = {
      showCancel,
      showConfirm,
      cancelText,
      confirmText,
      onCancel,
      onConfirm,
      ...buttonProps,
    }

    return (
      <ShadcnDialogFooter>
        {footer || <DialogActions {...actionProps} />}
      </ShadcnDialogFooter>
    )
  }
)

DialogFooter.displayName = 'DialogFooter';
