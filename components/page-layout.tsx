
import { cn } from "@/lib/utils";
import { SiteHeader } from "./site-header";

export type BreadcrumbDto = {
  label: string;
  href: string;
}

type Props = {
  breadcrumbs: BreadcrumbDto[];
  title: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  actionButton?: React.ReactNode;
  containerClassName?: string;
}

export default function PageLayout({ breadcrumbs, title, description, children, action, actionButton, containerClassName }: Props) {
  return (
    <main className="flex flex-col w-full h-full bg-zinc-100">
      <SiteHeader breadcrumbs={breadcrumbs} actionButton={actionButton} />

      <div className="w-full bg-zinc-100 py-4 px-2 h-fit flex-1 md:px-4 lg:py-4 lg:px-4">
        <div className={cn("bg-white w-full flex-1 flex flex-col gap-4 rounded-lg overflow-hidden border border-zinc-300 min-h-fit pb-4", containerClassName)}>
          <div className="px-4 pt-4 w-full flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-2 flex-1 ">
              <h1 className="text-2xl font-bold text-zinc-800">{title}</h1>
              {description && <p className="text-muted-foreground">{description}</p>}
            </div>
            {action && (
              <div className="flex items-end gap-2 h-full">
                {action}
              </div>
            )}
          </div>

          {children}
        </div>
      </div>
    </main>
  );
}
