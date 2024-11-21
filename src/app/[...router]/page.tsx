"use client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { type ReactNode, useSyncExternalStore } from "react";
import { routeTree } from "../../routeTree.gen";

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
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
