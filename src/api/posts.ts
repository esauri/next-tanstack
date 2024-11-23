import { queryOptions } from "@tanstack/react-query";
import type { Post } from "~/types/Post";

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function postsQueryOptions() {
  return queryOptions({
    queryKey: ["posts", "posts:list"],
    async queryFn() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
      );

      const data = await response.json();

      return (data as Post[]).slice(0, 10);
    },
  });
}

export function postQueryOptions(id: string) {
  return queryOptions({
    queryKey: ["posts", `posts:${id}`],
    async queryFn() {
      await wait(3000);

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      );

      const data = await response.json();

      return data as Post;
    },
  });
}
