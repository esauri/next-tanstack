import type { QueryClient } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import NextLink from "next/link";

type RouteContext = {
  queryClient: QueryClient;
};

const createRootRoute = createRootRouteWithContext<RouteContext>();

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="p-2 flex gap-2 text-lg">
        <NextLink href="/">Next</NextLink>{" "}
        <Link
          to="/home"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{" "}
        <Link
          to="/about"
          activeProps={{
            className: "font-bold",
          }}
        >
          About
        </Link>
        <Link
          to="/posts"
          activeProps={{
            className: "font-bold",
          }}
        >
          Posts
        </Link>
      </div>
      <hr />
      <main className="container px-4 mx-auto py-6">
        <Outlet />
      </main>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
