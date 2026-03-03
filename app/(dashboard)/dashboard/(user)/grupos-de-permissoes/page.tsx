import PageLayout, { BreadcrumbDto } from "@/components/page-layout";
import { Metadata } from "next";
import { CreateButton } from "./_components/create-button";
import GroupPermissionTable from "./_components/group-permission-table";

export const metadata: Metadata = {
  title: "Grupo de Permissões",
};

const breadcrumbs: BreadcrumbDto[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Grupo de Permissões",
    href: "/dashboard/grupos-de-permissoes",
  }
];

export default function GrupoDePermissoesPage() {
  return (
    <PageLayout
      title="Grupo de Permissões"
      description="Gerencie os grupos de permissões do sistema"
      breadcrumbs={breadcrumbs}
      actionButton={<CreateButton href="/dashboard/grupos-de-permissoes/criar" text="Novo Grupo" />}
      containerClassName="pb-0"
      action={
        <div className="flex gap-2 md:hidden">
          <CreateButton href="/dashboard/grupos-de-permissoes/criar" text="Novo Grupo" />
        </div>
      }
    >
      <main className="w-full flex flex-col gap-4 flex-1 h-full">
        <GroupPermissionTable />
      </main>
    </PageLayout>
  )
}