/**
 * @file edit-action.tsx
 * @description Componente de acción de edición
 * @module components/pages/dashboard/master/users/table/fragments/edit-action
 */

import { SquarePen } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import of types
import type { User } from '@/lib/api/types';

export const EditAction = ({ row }: { row: User }) => {

  // Handle
  const handleEdit = () => {
    console.log(row);
  };

  return (
    <Button variant="ghost" className='cursor-pointer' onClick={handleEdit}>
      <SquarePen className="size-4" />
    </Button>
  )
};
