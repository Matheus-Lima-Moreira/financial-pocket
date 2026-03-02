

import PageLayout, { BreadcrumbDto } from "@/components/page-layout";
import { Metadata } from "next";
import GroupPermissionCreateForm from "./_components/group-permission-create-form";

export const metadata: Metadata = {
  title: "Grupo de Permissões",
};

const breadcrumbs: BreadcrumbDto[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Grupo de Permissoes",
    href: "/dashboard/grupos-de-permissoes",
  },
  {
    label: "Criar",
    href: "/dashboard/grupos-de-permissões/criar",
  }
];


export default async function GrupoDePermissoesPage() {

  return (
    <PageLayout
      title="Novo Grupo de Permissoes"
      description="Crie um novo grupo de permissões para convidar os usuários"
      breadcrumbs={breadcrumbs}
      containerClassName="w-full"
    >
      <main className="bg-white h-fit">
        <GroupPermissionCreateForm />
      </main>
    </PageLayout>
  )
}