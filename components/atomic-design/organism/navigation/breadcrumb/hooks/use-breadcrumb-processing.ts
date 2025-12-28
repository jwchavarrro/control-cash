import { useMemo } from 'react';

// Import of types
import { BreadcrumbItem } from '@/types/navigation';

interface UseBreadcrumbProcessingProps {
  items: BreadcrumbItem[];
  disabledLabels: string[];
  showEllipsisMenu: boolean;
  maxVisibleItems: number;
}

interface ProcessedBreadcrumbs {
  visibleItems: BreadcrumbItem[];
  ellipsisItems: BreadcrumbItem[];
  shouldShowEllipsis: boolean;
}

export const useBreadcrumbProcessing = ({
  items,
  disabledLabels,
  showEllipsisMenu,
  maxVisibleItems,
}: UseBreadcrumbProcessingProps): ProcessedBreadcrumbs => {
  return useMemo(() => {
    // Marcar items como disabled basado en disabledLabels (case-insensitive)
    const processedItems = items.map((item) => ({
      ...item,
      disabled: disabledLabels.some(
        (disabledLabel) =>
          disabledLabel.toLowerCase() === item.label.toLowerCase()
      ),
    }));

    const shouldShowEllipsis =
      showEllipsisMenu && processedItems.length > maxVisibleItems;

    let visibleItems: BreadcrumbItem[] = processedItems;
    let ellipsisItems: BreadcrumbItem[] = [];

    if (shouldShowEllipsis) {
      const headCount = Math.max(1, maxVisibleItems - 2);
      visibleItems = [
        ...processedItems.slice(0, headCount),
        processedItems.at(-1)!,
      ];
      ellipsisItems = processedItems.slice(headCount, -1);
    }

    return {
      visibleItems,
      ellipsisItems,
      shouldShowEllipsis,
    };
  }, [items, disabledLabels, showEllipsisMenu, maxVisibleItems]);
};
