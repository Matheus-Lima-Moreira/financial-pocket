import { getSession } from "@/backend/session/helpers/get-session.helper";
import PageLayout from "@/components/page-layout";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const hasSession = await getSession();

  if (!hasSession) {
    return redirect("/login");
  }

  return (
    <PageLayout breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]} title="Dashboard">
      <div className="w-full">
        Conteúdol do dashboard geral
      </div>
    </PageLayout>
  )
}