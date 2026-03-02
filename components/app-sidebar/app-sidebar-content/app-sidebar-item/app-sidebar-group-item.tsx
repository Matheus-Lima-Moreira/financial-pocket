"use client"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AppSidebarItem } from "."
import { appSidebarIsUrlActive } from "./app-sidebar-is-url-active.helper"

type Props = {
  item: Required<AppSidebarItem>
}

export function AppSidebarGroupItem({ item }: Props) {
  const pathname = usePathname()
  const hasActiveSubitem = item.items.some(subItem => appSidebarIsUrlActive(pathname, subItem.url))
  const shouldBeOpen = hasActiveSubitem || item.isActive

  return (
    <Collapsible
      asChild
      defaultOpen={shouldBeOpen}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={item.title}
            className={cn(
              "cursor-pointer",
              hasActiveSubitem && "font-medium"
            )}
          >
            {hasActiveSubitem ? (
              <item.iconFilled strokeWidth={2.5} className="size-7 text-primary" />
            ) : (
              <item.icon strokeWidth={2} className="size-7" />
            )}
            <span className={cn("text-[0.9375rem]", hasActiveSubitem && "font-medium text-primary")}>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden transition-all duration-300 ease-in-out data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <SidebarMenuSub>
            {item.items.map((subItem) => {
              const isSubitemActive = appSidebarIsUrlActive(pathname, subItem.url)
              return (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton
                    asChild
                    className="cursor-pointer"
                  >
                    <Link href={subItem.url}>
                      <span className={cn("text-[0.9375rem]", isSubitemActive && "text-primary font-semibold")}>{subItem.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              )
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}