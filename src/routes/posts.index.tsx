import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { postsQueryOptions } from "~/api/posts";

export const Route = createFileRoute("/posts/")({
  component: PostsPage,
  loader({ context: { queryClient } }) {
    return queryClient.ensureQueryData(postsQueryOptions());
  },
});

function PostsPage() {
  const postsQuery = useSuspenseQuery(postsQueryOptions());
  const posts = postsQuery.data;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold">Posts</h1>
      <ul className="flex flex-col gap-2">
        {posts.map((post) => (
          <li key={`posts:${post.id}`}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
