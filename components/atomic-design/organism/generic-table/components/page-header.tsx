import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FilterIcon, PlusCircle, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { type ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface PageHeaderProps {
  title: string;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  enableColumnFilters: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  activeFilterCount: number;
  newButton?: {
    text: string;
    path?: string; // Target URL for navigation (optional if onClick is provided)
    onClick?: () => void | Promise<void>; // Custom action function (optional if path is provided)
    icon?: ReactNode;
  };
}

/**
 * Renders the filter button with active filters count
 */
const FilterButton = ({
  activeFilterCount,
  setIsFilterOpen,
}: {
  activeFilterCount: number;
  setIsFilterOpen: (isOpen: boolean) => void;
}) => {
  const isActive = activeFilterCount > 0;
  const tooltipText = isActive
    ? `${activeFilterCount} filtros activos`
    : 'Filtrar columnas';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={isActive ? 'default' : 'secondary'}
            size='sm'
            className={`h-8 relative ${
              isActive ? 'bg-primary text-primary-foreground' : ''
            }`}
            onClick={() => setIsFilterOpen(true)}
            aria-label={`Filtrar columnas (${activeFilterCount} activos)`}
          >
            <FilterIcon className='h-4 w-4 mr-1' />
            <span>Filtros</span>
            {isActive && (
              <Badge
                variant='secondary'
                className='ml-1 h-5 min-w-5 flex items-center justify-center p-0 text-xs'
              >
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{tooltipText}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

/**
 * Renders the new item button
 */
const NewButton = ({
  newButton,
}: {
  newButton: {
    text: string;
    path?: string;
    onClick?: () => void | Promise<void>;
    icon?: ReactNode;
  };
}) => {
  if (!newButton) return null;

  if (newButton.path) {
    return (
      <Link href={newButton.path} passHref>
        <Button variant='secondary' size='sm' className='h-8'>
          {newButton.icon || <PlusCircle className='mr-2 h-4 w-4' />}
          {newButton.text}
        </Button>
      </Link>
    );
  }

  if (newButton.onClick) {
    return (
      <Button
        variant='secondary'
        size='sm'
        className='h-8'
        onClick={newButton.onClick}
      >
        {newButton.icon || <PlusCircle className='mr-2 h-4 w-4' />}
        {newButton.text}
      </Button>
    );
  }

  return null;
};

export const PageHeaderComponent = ({
  title,
  globalFilter,
  setGlobalFilter,
  enableColumnFilters,
  setIsFilterOpen,
  activeFilterCount,
  newButton,
}: PageHeaderProps) => {
  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>{title}</h2>

      <div className='flex items-center justify-between py-4'>
        <div className='flex items-center gap-2'>
          <div className='relative'>
            <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              placeholder='Buscar'
              value={globalFilter ?? ''}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setGlobalFilter(event.target.value)
              }
              className='max-w-sm pl-8'
            />
          </div>

          {enableColumnFilters && (
            <FilterButton
              activeFilterCount={activeFilterCount}
              setIsFilterOpen={setIsFilterOpen}
            />
          )}
        </div>

        <div className='flex gap-2'>
          {newButton && <NewButton newButton={newButton} />}
        </div>
      </div>
    </div>
  );
};
