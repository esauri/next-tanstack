"use client";
import {
  createRouter,
  createRouteMask,
  RouterProvider,
} from "@tanstack/react-router";
import { type ReactNode, useSyncExternalStore } from "react";
import { getQueryClient } from "~/api/helpers/queryClient";
import { routeTree } from "~/routeTree.gen";

const queryClient = getQueryClient();

const postDetailMaskRoute = createRouteMask({
  routeTree,
  from: "/posts/$postId/modal",
  to: "/posts/$postId",
  params: true,
});

// Set up a Router instance
const router = createRouter({
  routeTree,
  routeMasks: [postDetailMaskRoute],
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function Router() {
  return (
    <ClientGate>
      <RouterProvider router={router} />
    </ClientGate>
  );
}

const emptySubscribe = () => () => {};

type ClientGateProps = {
  children: ReactNode;
};

function ClientGate({ children }: ClientGateProps) {
  const isServer = useSyncExternalStore(
    emptySubscribe,
    () => false,
    () => true,
  );

  if (isServer) return null;

  return children;
}
