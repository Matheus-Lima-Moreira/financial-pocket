import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppSidebarItem } from ".";
import { appSidebarIsUrlActive } from "./app-sidebar-is-url-active.helper";

type Props = {
  item: Omit<AppSidebarItem, 'items'>;
}

export function AppSidebarSingleItem({ item }: Props) {
  const pathname = usePathname();
  const isItemActive = appSidebarIsUrlActive(pathname, item.url);
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild

        tooltip={item.title}
        className={cn(
          "py-0 cursor-pointer h-9",
          isItemActive && "text-white bg-zinc-100 border border-zinc-300"
        )}
      >
        <Link href={item.url} className="ease-in-out duration-300">
          {isItemActive ? <item.iconFilled className="size-7 text-black" /> : <item.icon className="size-7 text-zinc-500" />}
          <span className={cn("text-[0.9375rem]", isItemActive && "text-black font-semibold")}>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}