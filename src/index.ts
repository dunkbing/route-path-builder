import type { PathParams, QueryParams, RouteDefinition } from "./types.ts";
import { buildQueryString, interpolatePathParams } from "./utils.ts";

/**
 * Creates a route path function for a given path template.
 *
 * @param path - The path template containing placeholders for path parameters.
 * @returns A function that takes path parameters and optional query parameters,
 * and returns the interpolated path with query string if provided.
 */
export function createRoutePath<T extends string>(
  path: T,
): <Q extends QueryParams>(params: PathParams<T>, queryParams?: Q) => string {
  return <Q extends QueryParams>(
    params: PathParams<T>,
    queryParams?: Q,
  ): string => {
    const interpolatedPath = interpolatePathParams(path, params);
    if (queryParams && Object.keys(queryParams).length > 0) {
      return `${interpolatedPath}?${buildQueryString(queryParams)}`;
    }
    return interpolatedPath;
  };
}

/**
 * Creates a mapping of route names to their respective path generation functions.
 *
 * @param routes - An list of route definitions containing name and path template.
 * @returns An object where keys are route names and values are functions that
 * generate paths based on provided path parameters and optional query parameters.
 */
export function createRoutePaths<T extends RouteDefinition[]>(routes: T) {
  return routes.reduce(
    (acc, route) => {
      acc[route.name as keyof typeof acc] = createRoutePath(route.path);
      return acc;
    },
    {} as {
      [K in T[number]["name"]]: ReturnType<
        typeof createRoutePath<T[number]["path"]>
      >;
    },
  );
}
