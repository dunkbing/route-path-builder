import assert from "node:assert";
import { describe, it } from "node:test";
import { createRoutePath, createRoutePaths } from "../src/index.ts";

describe("createRoutePath", () => {
  it("should create a route with path parameters", () => {
    const productPath = createRoutePath("/catalog/:category/:name");
    const result = productPath({ category: "cloth", name: "shirt" });
    assert.strictEqual(result, "/catalog/cloth/shirt");
  });

  it("should create a route with path parameters and query parameters", () => {
    const productPath = createRoutePath("/catalog/:category/:name");
    type QueryParams = {
      param1: string;
      param2: string;
    };
    const result = productPath<QueryParams>(
      { category: "cloth", name: "shirt" },
      { param1: "test", param2: "test2" },
    );
    assert.strictEqual(result, "/catalog/cloth/shirt?param1=test&param2=test2");
  });

  it("should handle routes without parameters", () => {
    const homePath = createRoutePath("/home");
    const result = homePath({});
    assert.strictEqual(result, "/home");
  });
});

describe("createRoutePaths", () => {
  it("should create multiple routes", () => {
    const routes = createRoutePaths([
      { name: "product", path: "/catalog/:category/:name" },
      { name: "user", path: "/user/:id" },
    ]);

    const productPath = routes.product({ category: "cloth", name: "shirt" });
    assert.strictEqual(productPath, "/catalog/cloth/shirt");

    const userPath = routes.user({ id: "123" });
    assert.strictEqual(userPath, "/user/123");
  });

  it("should handle routes with query parameters", () => {
    const routes = createRoutePaths([
      { name: "search", path: "/search", queryParams: { q: "", page: "" } },
    ]);

    const searchPath = routes.search<{ q: string; page: string }>({}, {
      q: "typescript",
      page: "1",
    });
    assert.strictEqual(searchPath, "/search?q=typescript&page=1");
  });
});
