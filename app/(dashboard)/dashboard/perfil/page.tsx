import { StatusCode } from "@/backend/shared/enum/status-code";
import { userProfileAction } from "@/backend/user/actions/user-profile.action";
import PageLayout, { BreadcrumbDto } from "@/components/page-layout";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProfileContent from "./_components/profile-content";

export const metadata: Metadata = {
  title: "Perfil",
};

const breadcrumbs: BreadcrumbDto[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Editar Perfil",
    href: "/dashboard/perfil",
  }
];

export default async function PerfilPage() {
  const profileResult = await userProfileAction();

  if (profileResult.code !== StatusCode.SUCCESS) {
    return notFound();
  }

  return (
    <PageLayout
      title="Editar Perfil"
      description="Gerencie suas informações pessoais e altere sua senha"
      breadcrumbs={breadcrumbs}
      containerClassName="max-w-4xl h-fit"
    >
      <main className="w-full flex flex-col gap-4 flex-1 h-fit">
        <ProfileContent profile={profileResult.data} />
      </main>
    </PageLayout>
  );
}