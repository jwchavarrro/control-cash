import {
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { SlashIcon } from 'lucide-react'

// Import of types
import { BreadcrumbItem as BreadcrumbItemType } from '@/components/atomic-design/organism/navigation/breadcrumb/utils'

interface BreadcrumbEllipsisMenuProps {
  ellipsisItems: BreadcrumbItemType[]
}

export const BreadcrumbEllipsisMenu = ({
  ellipsisItems,
}: BreadcrumbEllipsisMenuProps) => {
  if (ellipsisItems.length === 0) return null

  return (
    <>
      <BreadcrumbSeparator>
        <SlashIcon />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1">
            <BreadcrumbEllipsis className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="bg-background border-border min-w-40"
          >
            {ellipsisItems.map(item => (
              <DropdownMenuItem
                key={item.id}
                asChild
                className="hover:bg-primary hover:text-primary-foreground"
              >
                <a href={item.href || '#'}>{item.label}</a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </BreadcrumbItem>
    </>
  )
}
