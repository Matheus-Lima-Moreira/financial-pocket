import { groupPermissionReadAllServerAction } from "@/backend/group-permission/actions/group-permission-read-all-server.action";
import { StatusCode } from "@/backend/shared/enum/status-code";
import { userDetailsAction } from "@/backend/user/actions/user-details.action";
import PageLayout, { BreadcrumbDto } from "@/components/page-layout";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import UserEditForm from "./_components/user-edit-form";

export const metadata: Metadata = {
  title: "Editar Usuário",
};

const breadcrumbs: BreadcrumbDto[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Usuários",
    href: "/dashboard/usuarios",
  },
  {
    label: "Editar",
    href: "/dashboard/usuarios/editar",
  }
];

type UsuariosEditarPageProps = {
  searchParams: Promise<{
    id: string;
  }>;
};

export default async function UsuariosEditarPage({ searchParams }: UsuariosEditarPageProps) {
  const { id } = await searchParams;
  const [userResult, groupPermissionsResult] = await Promise.all([
    userDetailsAction(id),
    groupPermissionReadAllServerAction(),
  ]);

  if (userResult.code != StatusCode.SUCCESS) {
    return notFound();
  }

  return (
    <PageLayout
      title="Editar Usuário"
      description="Edite as informações do usuário"
      breadcrumbs={breadcrumbs}
      containerClassName="max-w-4xl h-fit"
    >
      <main className="w-full flex flex-col gap-4 flex-1 h-full">
        <UserEditForm
          user={userResult.data}
          groupPermissions={groupPermissionsResult.data || []}
        />
      </main>
    </PageLayout>
  )
}

