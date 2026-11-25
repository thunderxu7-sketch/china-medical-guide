const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export function pageHref(href: string): string {
  if (!base || !href.startsWith("/") || href.startsWith("//")) return href;
  const suffixAt = href.search(/[?#]/);
  const pathname = suffixAt < 0 ? href : href.slice(0, suffixAt);
  const suffix = suffixAt < 0 ? "" : href.slice(suffixAt);
  // Link directly to the generated directory even when a service query or an anchor follows.
  return base + pathname.replace(/\/$/, "") + "/" + suffix;
}

export function publicAsset(path: string): string {
  return base + path;
}

export function routePath(pathname: string): string {
  const insideBase = pathname === base || pathname.startsWith(base + "/");
  const path = insideBase ? pathname.slice(base.length) : pathname;
  return path.replace(/\/$/, "") || "/";
}
