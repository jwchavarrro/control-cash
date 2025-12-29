
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogHeader, type DialogHeaderProps } from './dialog-header';
import { DialogFooter, type DialogFooterProps } from './dialog-footer';

// Import of utilities
import { cn } from '@/lib/utils';

export interface BaseDialogProps
  extends DialogHeaderProps,
    Omit<DialogFooterProps, 'footer'> {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  trigger?: React.ReactNode;
  extraClassName?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export const BaseDialog: React.FC<BaseDialogProps> = ({
  open,
  setOpen,
  trigger,
  extraClassName,
  title,
  description,
  children,
  footer,
  showCancel,
  showConfirm,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  ...buttonProps
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={cn(extraClassName)}
        aria-describedby={description ? 'dialog-description' : undefined}
      >
        <DialogHeader title={title} description={description} />
        {children}
        <DialogFooter
          footer={footer}
          showCancel={showCancel}
          showConfirm={showConfirm}
          cancelText={cancelText}
          confirmText={confirmText}
          onCancel={onCancel}
          onConfirm={onConfirm}
          {...buttonProps}
        />
      </DialogContent>
    </Dialog>
  );
};
