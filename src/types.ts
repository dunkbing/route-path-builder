export type PathParams<T extends string> = T extends
  `${infer Start}:${infer Param}/${infer Rest}`
  ? { [K in Param | keyof PathParams<Rest>]: string }
  : T extends `${infer Start}:${infer Param}` ? { [K in Param]: string }
  : {};

export type QueryParams = Record<string, string>;

export type RouteDefinition = {
  name: string;
  path: string;
  queryParams?: Record<string, unknown>;
};
