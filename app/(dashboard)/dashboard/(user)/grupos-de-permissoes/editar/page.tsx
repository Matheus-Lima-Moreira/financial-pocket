

import { actionReadAllAction } from "@/backend/actions/actions/action-read-all.action";
import { groupPermissionDetailsAction } from "@/backend/group-permission/actions/group-permission-details.action";
import { StatusCode } from "@/backend/shared/enum/status-code";
import PageLayout, { BreadcrumbDto } from "@/components/page-layout";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import GroupPermissionEditForm from "./_components/group-permission-edit-form";

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
    label: "Editar",
    href: "/dashboard/grupos-de-permissões/editar",
  }
];


type GrupoDePermissoesPageProps = {
  searchParams: Promise<{
    id: string;
  }>;
};

export default async function GrupoDePermissoesPage({ searchParams }: GrupoDePermissoesPageProps) {
  const { id } = await searchParams;
  const actions = await actionReadAllAction();
  const result = await groupPermissionDetailsAction(id);

  if (result.code != StatusCode.SUCCESS) {
    return notFound();
  }

  return (
    <PageLayout
      title="Editar Grupo de Permissoes"
      description="Edite um grupo de permissões para convidar os usuários"
      breadcrumbs={breadcrumbs}
    >
      <main className="bg-white">
        <GroupPermissionEditForm actions={actions.data ?? []} groupPermission={result.data} />
      </main>
    </PageLayout>
  )
}