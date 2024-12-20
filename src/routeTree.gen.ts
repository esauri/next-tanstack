/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as HomeImport } from "./routes/home";
import { Route as AboutImport } from "./routes/about";
import { Route as PostsRouteImport } from "./routes/posts.route";
import { Route as PostsPostIdIndexImport } from "./routes/posts_.$postId.index";
import { Route as PostsPostIdModalImport } from "./routes/posts.$postId.modal";

// Create/Update Routes

const HomeRoute = HomeImport.update({
  id: "/home",
  path: "/home",
  getParentRoute: () => rootRoute,
} as any);

const AboutRoute = AboutImport.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => rootRoute,
} as any);

const PostsRouteRoute = PostsRouteImport.update({
  id: "/posts",
  path: "/posts",
  getParentRoute: () => rootRoute,
} as any);

const PostsPostIdIndexRoute = PostsPostIdIndexImport.update({
  id: "/posts_/$postId/",
  path: "/posts/$postId/",
  getParentRoute: () => rootRoute,
} as any);

const PostsPostIdModalRoute = PostsPostIdModalImport.update({
  id: "/$postId/modal",
  path: "/$postId/modal",
  getParentRoute: () => PostsRouteRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/posts": {
      id: "/posts";
      path: "/posts";
      fullPath: "/posts";
      preLoaderRoute: typeof PostsRouteImport;
      parentRoute: typeof rootRoute;
    };
    "/about": {
      id: "/about";
      path: "/about";
      fullPath: "/about";
      preLoaderRoute: typeof AboutImport;
      parentRoute: typeof rootRoute;
    };
    "/home": {
      id: "/home";
      path: "/home";
      fullPath: "/home";
      preLoaderRoute: typeof HomeImport;
      parentRoute: typeof rootRoute;
    };
    "/posts/$postId/modal": {
      id: "/posts/$postId/modal";
      path: "/$postId/modal";
      fullPath: "/posts/$postId/modal";
      preLoaderRoute: typeof PostsPostIdModalImport;
      parentRoute: typeof PostsRouteImport;
    };
    "/posts_/$postId/": {
      id: "/posts_/$postId/";
      path: "/posts/$postId";
      fullPath: "/posts/$postId";
      preLoaderRoute: typeof PostsPostIdIndexImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

interface PostsRouteRouteChildren {
  PostsPostIdModalRoute: typeof PostsPostIdModalRoute;
}

const PostsRouteRouteChildren: PostsRouteRouteChildren = {
  PostsPostIdModalRoute: PostsPostIdModalRoute,
};

const PostsRouteRouteWithChildren = PostsRouteRoute._addFileChildren(
  PostsRouteRouteChildren,
);

export interface FileRoutesByFullPath {
  "/posts": typeof PostsRouteRouteWithChildren;
  "/about": typeof AboutRoute;
  "/home": typeof HomeRoute;
  "/posts/$postId/modal": typeof PostsPostIdModalRoute;
  "/posts/$postId": typeof PostsPostIdIndexRoute;
}

export interface FileRoutesByTo {
  "/posts": typeof PostsRouteRouteWithChildren;
  "/about": typeof AboutRoute;
  "/home": typeof HomeRoute;
  "/posts/$postId/modal": typeof PostsPostIdModalRoute;
  "/posts/$postId": typeof PostsPostIdIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/posts": typeof PostsRouteRouteWithChildren;
  "/about": typeof AboutRoute;
  "/home": typeof HomeRoute;
  "/posts/$postId/modal": typeof PostsPostIdModalRoute;
  "/posts_/$postId/": typeof PostsPostIdIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | "/posts"
    | "/about"
    | "/home"
    | "/posts/$postId/modal"
    | "/posts/$postId";
  fileRoutesByTo: FileRoutesByTo;
  to: "/posts" | "/about" | "/home" | "/posts/$postId/modal" | "/posts/$postId";
  id:
    | "__root__"
    | "/posts"
    | "/about"
    | "/home"
    | "/posts/$postId/modal"
    | "/posts_/$postId/";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  PostsRouteRoute: typeof PostsRouteRouteWithChildren;
  AboutRoute: typeof AboutRoute;
  HomeRoute: typeof HomeRoute;
  PostsPostIdIndexRoute: typeof PostsPostIdIndexRoute;
}

const rootRouteChildren: RootRouteChildren = {
  PostsRouteRoute: PostsRouteRouteWithChildren,
  AboutRoute: AboutRoute,
  HomeRoute: HomeRoute,
  PostsPostIdIndexRoute: PostsPostIdIndexRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/posts",
        "/about",
        "/home",
        "/posts_/$postId/"
      ]
    },
    "/posts": {
      "filePath": "posts.route.tsx",
      "children": [
        "/posts/$postId/modal"
      ]
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/home": {
      "filePath": "home.tsx"
    },
    "/posts/$postId/modal": {
      "filePath": "posts.$postId.modal.tsx",
      "parent": "/posts"
    },
    "/posts_/$postId/": {
      "filePath": "posts_.$postId.index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
