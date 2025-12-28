/**
 * @file use-breadcrumbs.ts
 * @description Hook para generar las breadcrumbs basadas en la ruta actual
 * @module components/atomic-design/organism/navigation/breadcrumb/hooks/use-breadcrumbs
 */

'use client'

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

// Import of utilities
import { NAVIGATION_NAV_MAIN } from '@/components/pages/dashboard/utils/constants';

// Import of types
import { BreadcrumbItem, NavItem } from '@/types/navigation';

/**
 * Capitaliza la primera letra de un string
 */
const capitalizeFirstLetter = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const useBreadcrumbs = () => {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    return generateBreadcrumbs(pathname, NAVIGATION_NAV_MAIN.NAV_MAIN);
  }, [pathname]);

  return breadcrumbs;
};

const generateBreadcrumbs = (
  pathname: string,
  navItems: NavItem[]
): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Inicio', href: '/', id: crypto.randomUUID() },
  ];

  if (pathname === '/') {
    return breadcrumbs;
  }

  // Dividir la ruta en segmentos
  const pathSegments = pathname.split('/').filter(Boolean);

  let currentPath = '';
  let currentNavItems = navItems;

  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i];
    currentPath += `/${segment}`;

    // Buscar en la navegación principal
    const matchingItem = findNavItemByPathSegment(segment, currentNavItems);
    if (matchingItem) {
      breadcrumbs.push({
        label: matchingItem.title,
        href: currentPath,
        active: i === pathSegments.length - 1,
        id: crypto.randomUUID(),
      });
      if (matchingItem.items) {
        currentNavItems = matchingItem.items;
      }
    } else {
      // Si no hay coincidencia, usar el segmento capitalizado
      breadcrumbs.push({
        label: capitalizeFirstLetter(segment),
        href: currentPath,
        active: i === pathSegments.length - 1,
        id: crypto.randomUUID(),
      });
    }
  }

  // Marcar el último como activo
  if (breadcrumbs.length > 0) {
    breadcrumbs.at(-1)!.active = true;
  }

  return breadcrumbs;
};

/**
 * Find a navigation item that matches a path segment
 */
const findNavItemByPathSegment = (
  segment: string,
  navItems: NavItem[]
): NavItem | undefined => {
  if (!navItems) return undefined;

  return navItems.find((item) => {
    // Get the last segment of the URL
    const itemPath = item.url || item.href || '';
    const segments = itemPath.split('/').filter(Boolean);

    if (segments.length === 0) {
      return false;
    }

    const [itemSegment] = segments.slice(-1);
    return itemSegment === segment;
  });
};
