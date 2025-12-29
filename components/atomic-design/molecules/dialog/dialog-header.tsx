import {
  DialogHeader as ShadcnDialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

// Import of components custom
import { Title, Text } from '@/components/atomic-design/atoms';

export interface DialogHeaderProps {
  title?: string;
  description?: string;
}

export const DialogHeader = ({ title, description }: DialogHeaderProps) => {
  // Retornar null si no hay título ni descripción
  if (!title && !description) return null;

  return (
    <ShadcnDialogHeader>
      {title && (
        <DialogTitle>
          <Title level={3} color='primary' >{title}</Title>
        </DialogTitle>
      )}
      {description && (
        <DialogDescription id='dialog-description'>
          <Text variant='small' color='default' >{description}</Text>
        </DialogDescription>
      )}
    </ShadcnDialogHeader>
  );
};
