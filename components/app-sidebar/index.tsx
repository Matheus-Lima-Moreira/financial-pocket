"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IconBookFilled, IconBriefcase, IconBriefcaseFilled, IconBuilding, IconBuildingBridge2Filled, IconBuildingBroadcastTowerFilled, IconCoin, IconCoinFilled, IconFileInvoice, IconFileInvoiceFilled, IconHelpCircleFilled, IconLayoutDashboard, IconLayoutDashboardFilled, IconShield, IconShieldFilled, IconUser, IconUserFilled } from '@tabler/icons-react';
import Link from "next/link";
import { Logo } from "../logo";
import { AppSidebarContent, AppSidebarContentProps } from "./app-sidebar-content";
import { PremiumCard } from "./premium-card";



const data: AppSidebarContentProps[] = [
  {
    title: "Geral",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: IconLayoutDashboard,
        iconFilled: IconLayoutDashboardFilled,
        isActive: true,
      },
      {
        title: "Obras",
        url: "/dashboard/obras",
        icon: IconBuilding,
        iconFilled: IconBuildingBroadcastTowerFilled,
      },
      {
        title: "Usuários",
        url: "/dashboard/usuarios",
        icon: IconUser,
        iconFilled: IconUserFilled,
      },
      {
        title: "Grupos de permissões",
        url: "/dashboard/grupos-de-permissoes",
        icon: IconShield,
        iconFilled: IconShieldFilled,
      },
    ],
  },
  {
    title: "Financeiro",
    items: [
      {
        title: "Lançamentos Financeiros",
        url: "/dashboard/lancamentos-financeiros",
        icon: IconCoin,
        iconFilled: IconCoinFilled,
      },
      {
        title: "Folha de Pagamento",
        url: "/dashboard/folha-de-pagamento",
        icon: IconFileInvoice,
        iconFilled: IconFileInvoiceFilled,
      },
    ],
  },
  {
    title: "Workforce",
    items: [
      {
        title: "Funcionários",
        url: "/dashboard/funcionarios",
        icon: IconCoin,
        iconFilled: IconCoinFilled,
      },
      {
        title: "Prestadores de Serviço",
        url: "/dashboard/prestadores-de-servico",
        icon: IconFileInvoice,
        iconFilled: IconFileInvoiceFilled,
      },
    ],
  },
  {
    title: "Configurações",
    items: [
      {
        title: "Cargos",
        url: "/dashboard/cargos",
        icon: IconBriefcase,
        iconFilled: IconBriefcaseFilled,
      },
      {
        title: "Empresa",
        url: "/dashboard/empresa",
        icon: IconBuilding,
        iconFilled: IconBuildingBridge2Filled,
      },
    ],
  }
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {


  return (
    <Sidebar collapsible="offcanvas" {...props} className="p-0 bg-white border-r border-zinc-300">
      <SidebarHeader className="border-b border-zinc-300 dark:border-zinc-800 p-0 bg-white" style={{ height: "var(--header-height)" }}>
        <div className="w-full h-full flex items-center justify-center">
          <Logo />
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white p-2 dark:bg-zinc-900 relative">
        {data.map((item, idx) => (
          <AppSidebarContent key={`menu-content-${idx}`} title={item.title} items={item.items} />
        ))}

      </SidebarContent>
      <SidebarFooter className="bg-white">
        <SidebarMenu>
          <PremiumCard />
          <SidebarMenuItem className="hover:bg-none">
            <SidebarMenuButton tooltip="Configurações" className="cursor-pointer">
              <IconBookFilled className="size-7 text-zinc-500" />
              <span className="text-[0.9375rem]">Feedback</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/dashboard/central-de-ajuda">
              <SidebarMenuButton
                tooltip="Central de Ajuda"
                className="cursor-pointer"
              >
                <IconHelpCircleFilled className="size-7 text-zinc-500" />
                <span className="text-[0.9375rem]">Central de Ajuda</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
