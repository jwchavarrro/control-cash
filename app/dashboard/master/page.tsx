/**
 * @file master.page.tsx
 * @description Página maestra
 * @module app/dashboard/master/page
 */

// Import of components custom
import { Header } from '@/components/atomic-design/molecules'
import { CardA } from '@/components/atomic-design/molecules/cards/card-a'

// Import of utilities
import { KEYWORDS } from '@/config'
import {
  MASTER_CARD_LIST,
  type MasterCardItem,
} from '@/components/pages/dashboard/master'

export default function MasterPage() {
  return (
    <div className="container mx-auto flex flex-col gap-4">
      <Header
        title={KEYWORDS.COMPONENTS.NAVIGATION.SIDEBAR.MASTER.TITLE}
        text="Enter the module you want to manage."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {MASTER_CARD_LIST?.map((item: MasterCardItem) => (
          <CardA
            key={item.name}
            icon={item.icon}
            title={item.name}
            description={item.detail}
            link={item.link}
          />
        ))}
      </div>
    </div>
  )
}
