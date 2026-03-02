import PageLayout, { BreadcrumbDto } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import notFoundImage from "@/images/not-found.svg";
import Image from "next/image";
import Link from "next/link";


type Props = {
  title: string;
  breadcrumbs: BreadcrumbDto[];
  description: string;
  href: string;
  buttonLabel: string;
  includePageLayout: boolean;
}

export default function NotFound({ title, buttonLabel, breadcrumbs, description, href, includePageLayout = true }: Props) {

  if (includePageLayout) {
    return (<PageLayout title="" breadcrumbs={breadcrumbs}>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-6">
        <Image src={notFoundImage} alt="Não encontrado" width={160} height={160} priority />
        <div className="flex flex-col items-center gap-2 text-center max-w-md">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
        <Link href={href}>
          <Button size="lg">
            {buttonLabel}
          </Button>
        </Link>
      </div>
    </PageLayout>);
  }
  return "pagina não encontrada";
}