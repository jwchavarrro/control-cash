/**
 * @file table-error.tsx
 * @description Componente que muestra un mensaje de error cuando ocurre un problema al cargar los datos de la tabla.
 * @module components/atomic-design/organism/generic-table/fragments/table-error
 */

import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface TableErrorProps {
  title: string
  description: string
}

export const TableError = ({ title, description }: TableErrorProps) => {
  return (
    <div>
      <Alert
        variant="destructive"
        className="border-destructive"
        data-testid="table-error-message"
      >
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  )
}
