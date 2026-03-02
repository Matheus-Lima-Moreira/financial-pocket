"use client"


import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu
} from "@/components/ui/sidebar";
import { AppSidebarItem } from "./app-sidebar-item";




export type AppSidebarContentProps = {
  title: string;
  items: AppSidebarItem[];
}

export function AppSidebarContent({ title, items }: AppSidebarContentProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sm">{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <AppSidebarItem key={item.title} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
