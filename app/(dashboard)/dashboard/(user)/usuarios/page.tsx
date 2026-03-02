import PageLayout, { BreadcrumbDto } from "@/components/page-layout";
import { Metadata } from "next";
import { CreateButton } from "./_components/create-button";
import UserListTable from "./_components/user-list-table";

export const metadata: Metadata = {
  title: "Usuários",
};

const breadcrumbs: BreadcrumbDto[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Usuários",
    href: "/dashboard/usuarios",
  }
];

export default function UsuariosPage() {
  return (
    <PageLayout
      title="Usuários"
      description="Gerencie os usuários do sistema"
      breadcrumbs={breadcrumbs}
      actionButton={<CreateButton href="/dashboard/usuarios/criar" text="Convidar Usuário" />}
      containerClassName="pb-0"
      action={
        <div className="flex gap-2 md:hidden">
          <CreateButton href="/dashboard/usuarios/criar" text="Convidar Usuário" />
        </div>
      }
    >
      <main className="w-full flex flex-col gap-4 flex-1 h-full pb-0">
        <UserListTable />
      </main>
    </PageLayout>
  )
}