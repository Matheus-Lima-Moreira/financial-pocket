
import { AppSidebar } from "@/components/app-sidebar"
import { AuthProvider } from "@/components/hooks/session-hook"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s - Dashboard",
    default: "Dashboard",
  },
  description: "Dashboard",
  icons: {
    icon: "/favicon.ico",
  },
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <AuthProvider>
      <Toaster />
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 14)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <div className="flex flex-1 flex-col bg-zinc-100">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </AuthProvider>
  )
}