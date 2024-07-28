# TypeScript Route Builder

A small typescript library for building type-safe route paths with support for
path and query parameters.

## Installation

Using npm:

```bash
npm install route-path-builder
```

Usage Creating a Single Route Path

```typescript
import { createRoutePath } from "route-path-builder";

const productPath = createRoutePath("/catalog/:category/:name");

// Generate path with parameters
const url1 = productPath({ category: "cloth", name: "shirt" });
console.log(url1); // Output: /catalog/cloth/shirt

// Generate path with parameters and query parameters
type QueryParams = {
  param1: string;
  param2: string;
};
const url2 = productPath<QueryParams>(
  { category: "cloth", name: "shirt" },
  { param1: "test", param2: "test2" },
);
console.log(url2); // Output: /catalog/cloth/shirt?param1=test&param2=test2
```

```typescript
import { createRoutePaths } from "route-path-builder";

const routes = createRoutePaths([
  { name: "product", path: "/catalog/:category/:name" },
  { name: "user", path: "/user/:id" },
]);
const productPath = routes.product({ category: "cloth", name: "shirt" });
console.log(productPath); // Output: /catalog/cloth/shirt

const userPath = routes.user({ id: "123" });
console.log(userPath); // Output: /user/123
```
