"use client"

import { TablerIcon } from "@tabler/icons-react"
import { AppSidebarGroupItem } from "./app-sidebar-group-item"
import { AppSidebarSingleItem } from "./app-sidebar-single-item"

export type AppSidebarItem = {
  title: string
  url: string
  icon: TablerIcon
  iconFilled: TablerIcon
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}

export function AppSidebarItem({ item }: { item: AppSidebarItem }) {
  const hasItems = item.items && item.items.length > 0

  if (!hasItems) {
    return <AppSidebarSingleItem item={item} />
  }

  return <AppSidebarGroupItem item={item as Required<AppSidebarItem>} />
}

