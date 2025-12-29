import { memo, useMemo } from 'react'

// Import of utilities
import { cn } from '@/lib/utils'

import {
  Tabs as TabsShadcn,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs'

type TabValue = string | number

interface TabsProps {
  options: TabValue[]
  content?: Record<TabValue, React.ReactNode>
  selectedItem: TabValue
  setSelectedItem: (item: TabValue) => void
  extraClassName?: string
  extraClassNameTab?: string
  disabledItems?: TabValue[]
  disabled?: boolean
}

export const Tabs = memo(
  ({
    options,
    selectedItem,
    setSelectedItem,
    extraClassName = '',
    extraClassNameTab = '',
    disabled = false,
    disabledItems = [],
    content,
  }: TabsProps) => {
    const selectedItemString = selectedItem.toString()

    const tabTriggers = useMemo(
      () =>
        options?.map(item => {
          const itemString = item.toString()
          const isSelected = selectedItem === item
          const isDisabled = disabled || disabledItems.includes(item)

          return (
            <TabsTrigger
              key={item}
              value={itemString}
              className={cn(
                'w-full cursor-pointer px-5 capitalize',
                extraClassNameTab,
                isSelected && 'data-[state=active]:bg-primary text-white'
              )}
              disabled={isDisabled}
            >
              {item}
            </TabsTrigger>
          )
        }),
      [options, selectedItem, extraClassNameTab, disabled, disabledItems]
    )

    const tabContent = useMemo(
      () =>
        content &&
        options.map(item =>
          content[item] ? (
            <TabsContent key={item} value={item.toString()}>
              {content[item]}
            </TabsContent>
          ) : null
        ),
      [content, options]
    )

    return (
      <TabsShadcn
        value={selectedItemString}
        onValueChange={val => {
          // Buscar valor original en options para mantener el tipo correcto
          const originalValue = options.find(
            option => option.toString() === val
          )
          if (originalValue !== undefined) {
            setSelectedItem(originalValue)
          }
        }}
      >
        <TabsList
          className={cn(
            'flex w-full flex-wrap items-center gap-2 md:w-fit',
            extraClassName
          )}
        >
          {tabTriggers}
        </TabsList>
        {tabContent}
      </TabsShadcn>
    )
  }
)

Tabs.displayName = 'Tabs'
