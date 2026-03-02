export function appSidebarIsUrlActive(pathname: string, url: string): boolean {
  const normalizedPathname = pathname.replace(/\/$/, '')
  const normalizedUrl = url.replace(/\/$/, '')

  // Se a URL for exatamente "/dashboard", só deve ser ativo se o pathname for exatamente "/dashboard"
  if (normalizedUrl === "/dashboard") {
    return normalizedPathname === "/dashboard"
  }

  // Para outras URLs, verifica se o pathname corresponde exatamente ou começa com a URL + '/'
  if (normalizedPathname === normalizedUrl) {
    return true
  }

  if (normalizedPathname.startsWith(normalizedUrl + '/')) {
    return true
  }

  return false
}