import type { PathParams, QueryParams } from "./types.ts";

export function interpolatePathParams<T extends string>(
  path: T,
  params: PathParams<T>,
): string {
  return path.replace(
    /:(\w+)/g,
    (_, key) => String(params[key as keyof PathParams<T>] || ""),
  );
}

export function buildQueryString(params: QueryParams): string {
  const searchParams = new URLSearchParams(params);
  return searchParams.toString();
}
