/**
 * @file table-skeleton.tsx
 * @description Componente que muestra un estado de carga visual para tablas genéricas.
 * @module components/atomic-design/organism/generic-table/fragments/table-skeleton
 */

import { useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

interface TableSkeletonProps {
  columns: number
  rows?: number
  extraClassName?: string
}

/**
 * @function generateUniqueId
 * @description Genera un ID único
 * @returns {string} ID único
 */
const generateUniqueId = () => Math.random().toString(36).substring(2, 15)

export const TableSkeleton = ({
  columns,
  rows = 5,
  extraClassName = '',
}: TableSkeletonProps) => {
  // Memo
  const keys = useMemo(
    () => ({
      headers: Array.from({ length: columns }, () => generateUniqueId()),
      rows: Array.from({ length: rows }, () => generateUniqueId()),
      cells: Array.from({ length: rows }, () =>
        Array.from({ length: columns }, () => generateUniqueId())
      ),
    }),
    [columns, rows]
  )

  return (
    <div className={`w-full overflow-hidden rounded-t-xl ${extraClassName}`}>
      <Table>
        <TableHeader className="bg-muted-foreground">
          <TableRow className="border-b-border">
            {keys.headers.map(key => (
              <TableHead key={key}>
                <Skeleton className={`bg-muted h-4 w-full max-w-40`} />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {keys.rows.map((rowKey, rowIndex) => (
            <TableRow key={rowKey} className="border-b-border">
              {keys.cells[rowIndex].map(cellKey => (
                <TableCell key={cellKey}>
                  <Skeleton className={`bg-muted-foreground h-4 w-full`} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
