"use server";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Fragment } from "react/jsx-runtime";
import { BreadcrumbDto } from "../page-layout";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { NotificationButton } from "./notification-button";
import { SiteHeaderUser } from "./site-header-user";

type Props = {
  breadcrumbs: BreadcrumbDto[];
  actionButton?: React.ReactNode;
}

export async function SiteHeader({ breadcrumbs, actionButton }: Props) {

  return (
    <header className="flex shrink-0 items-center gap-2 bg-white border-b border-zinc-300 dark:border-zinc-800  transition-[width,height] ease-linear" style={{ height: "var(--header-height)" }}>
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 bg-zinc-300 data-[orientation=vertical]:w-px data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center"
        />
        {breadcrumbs.length > 0 && (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.length === 1 ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>{breadcrumbs[0].label}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <>
                  {/* Primeiro breadcrumb - sem link, oculto no mobile */}
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbPage>{breadcrumbs[0].label}</BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block">
                    /
                  </BreadcrumbSeparator>

                  {/* Itens intermediários - apenas no desktop */}
                  {breadcrumbs.length > 2 && (
                    <>
                      {breadcrumbs.slice(1, -1).map((breadcrumb) => (
                        <Fragment key={'breadcrumb-item-' + breadcrumb.href}>
                          <BreadcrumbItem className="hidden md:inline-flex">
                            <BreadcrumbLink href={breadcrumb.href}>
                              {breadcrumb.label}
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator className="hidden md:block">
                            /
                          </BreadcrumbSeparator>
                        </Fragment>
                      ))}

                      {/* Ellipsis no mobile quando há itens intermediários */}
                      <BreadcrumbItem className="md:hidden">
                        <BreadcrumbEllipsis />
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="md:hidden">
                        /
                      </BreadcrumbSeparator>
                    </>
                  )}

                  {/* Último breadcrumb (página atual) - sempre visível */}
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-semibold text-primary">{breadcrumbs[breadcrumbs.length - 1].label}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>

      {actionButton && (
        <>
          <div className="hidden md:flex items-center">
            {actionButton}
          </div>
          <Separator
            orientation="vertical"
            className="hidden md:block mx-2 bg-zinc-300 data-[orientation=vertical]:w-px data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center"
          />
        </>
      )}
      <NotificationButton />
      <Separator
        orientation="vertical"
        className="mx-2 bg-zinc-300 data-[orientation=vertical]:w-px data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center"
      />
      <SiteHeaderUser />
    </header>
  )
}
