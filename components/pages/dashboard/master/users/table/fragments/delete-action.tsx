/**
 * @file edit-action.tsx
 * @description Componente de acción de edición
 * @module components/pages/dashboard/master/users/table/fragments/edit-action
 */

import { Trash } from 'lucide-react'

// Import of componts custom
import { ButtonAction } from '@/components/common/generic-table';

// Import of types
import type { User } from '@/lib/api/types';

export const DeleteAction = ({ row }: { row: User }) => {

  // Handle
  const handleOnClickDelete = () => {
    console.log(row);
  };

  return <ButtonAction tooltipMessage='Delete' icon={Trash} />
};
