import { BreadcrumbDto } from "@/components/page-layout";

type NavItem = {
  title: string;
  url: string;
  items?: {
    title: string;
    url: string;
  }[];
  subitems?: {
    title: string;
    url: string;
  }[];
};

const navData: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    title: "Gerenciamento de Usuários",
    url: "/dashboard/usuarios",
    items: [
      {
        title: "Grupo de Permissões",
        url: "/dashboard/usuarios/grupos-de-permissoes",
      }
    ]
  },
  {
    title: "Obras",
    url: "/dashboard/obras",
  },
];

export function generateBreadcrumbs(pathname: string): BreadcrumbDto[] {
  const breadcrumbs: BreadcrumbDto[] = [];
  
  // Normaliza o pathname
  const normalizedPath = pathname.replace(/\/$/, '');
  
  // Procura o item correspondente no menu
  for (const item of navData) {
    const subitems = item.items || item.subitems || [];
    
    // Verifica se é o item principal
    if (normalizedPath === item.url) {
      breadcrumbs.push({
        label: item.title,
        href: item.url,
      });
      return breadcrumbs;
    }
    
    // Verifica se é um subitem
    for (const subitem of subitems) {
      if (normalizedPath === subitem.url) {
        breadcrumbs.push({
          label: item.title,
          href: item.url,
        });
        breadcrumbs.push({
          label: subitem.title,
          href: subitem.url,
        });
        return breadcrumbs;
      }
    }
    
    // Verifica se o pathname começa com a URL do item (para rotas dinâmicas)
    if (normalizedPath.startsWith(item.url + '/')) {
      breadcrumbs.push({
        label: item.title,
        href: item.url,
      });
      
      // Tenta encontrar o subitem correspondente
      for (const subitem of subitems) {
        if (normalizedPath.startsWith(subitem.url + '/') || normalizedPath === subitem.url) {
          breadcrumbs.push({
            label: subitem.title,
            href: subitem.url,
          });
          return breadcrumbs;
        }
      }
      
      // Se não encontrou subitem, retorna apenas o item principal
      return breadcrumbs;
    }
  }
  
  // Se não encontrou nada, retorna breadcrumb padrão
  return [{
    label: "Dashboard",
    href: "/dashboard",
  }];
}








