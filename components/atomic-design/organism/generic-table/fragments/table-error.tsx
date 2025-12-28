/**
 * @file table-error.tsx
 * @description Componente que muestra un mensaje de error cuando ocurre un problema al cargar los datos de la tabla.
 * @module components/atomic-design/organism/generic-table/fragments/table-error
 */

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface TableErrorProps {
  title?: string;
  description?: string;
}

export const TableError = ({
  title = 'Error al cargar los datos',
  description = 'Ha ocurrido un error al intentar cargar los datos. Por favor, intente nuevamente más tarde.',
}: TableErrorProps) => {
  return (
    <div className='w-full p-4 animate-in slide-in-from-bottom-10 duration-300'>
      <Alert
        variant='destructive'
        className='border-destructive'
        data-testid='table-error-message'
      >
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  );
};
