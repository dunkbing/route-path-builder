import { PathParams, QueryParams, RouteDefinition } from './types';
import { interpolatePathParams, buildQueryString } from './utils';

export function createRoutePath<T extends string>(path: T) {
  return <Q extends QueryParams>(params: PathParams<T>, queryParams?: Q): string => {
    const interpolatedPath = interpolatePathParams(path, params);
    if (queryParams && Object.keys(queryParams).length > 0) {
      return `${interpolatedPath}?${buildQueryString(queryParams)}`;
    }
    return interpolatedPath;
  };
}

export function createRoutePaths<T extends RouteDefinition[]>(routes: T) {
  return routes.reduce((acc, route) => {
    acc[route.name as keyof typeof acc] = createRoutePath(route.path);
    return acc;
  }, {} as { [K in T[number]['name']]: ReturnType<typeof createRoutePath<T[number]['path']>> });
}
