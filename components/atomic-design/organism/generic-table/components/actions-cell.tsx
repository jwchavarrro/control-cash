import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/atomic-design/atoms/shadcn/dropdown-menu';
import { Button } from '@/components/atomic-design/atoms/shadcn/button';
import { type ActionItem } from '../types';

// Accept broader TData type
interface ActionsCellProps<TData extends Record<string, unknown>> {
  actions: ActionItem<TData>[];
  row: TData;
}

export const ActionsCell = <TData extends Record<string, unknown>>({
  actions,
  row,
}: ActionsCellProps<TData>) => {
  const MAX_DIRECT_ACTIONS = 3;

  // Helper to generate a key, checking for row.id existence
  const generateKey = (index: number): string | number => {
    if (typeof row.id === 'string' || typeof row.id === 'number') {
      return `${row.id}-${index}`;
    } else {
      // Fallback to index if id is not present or not string/number
      return index;
    }
  };

  // If we have 3 or fewer actions, render them directly
  if (actions.length <= MAX_DIRECT_ACTIONS) {
    return (
      <div className='flex items-center space-x-2'>
        {actions.map((action, index) => {
          const ActionComponent = action.component;
          const key = generateKey(index);
          return <ActionComponent key={key} row={row} />;
        })}
      </div>
    );
  }

  // If we have more than 3 actions, use a dropdown menu
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {actions.map((action, index) => {
          const ActionComponent = action.component;
          const key = generateKey(index);
          return (
            <DropdownMenuItem key={key} asChild>
              <div className='cursor-pointer'>
                <ActionComponent row={row} />
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
