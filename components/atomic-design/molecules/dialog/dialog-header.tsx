/**
 * @file dialog-header.tsx
 * @description Componente de header de diálogo
 * @module components/atomic-design/molecules/dialog/dialog-header
 */

import {
  DialogHeader as ShadcnDialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';


export interface DialogHeaderProps {
  title?: string;
  description?: string;
}

export const DialogHeader = ({ title, description }: DialogHeaderProps) => {
  // Retornar null si no hay título ni descripción
  if (!title && !description) return null;

  return (
    <ShadcnDialogHeader>
      {title && <DialogTitle>{title}</DialogTitle>}
      {description && (
        <DialogDescription id="dialog-description">
          {description}
        </DialogDescription>
      )}
    </ShadcnDialogHeader>
  )
};
