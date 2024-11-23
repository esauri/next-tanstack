import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  ErrorComponent,
  createFileRoute,
  useRouter,
} from "@tanstack/react-router";
import { postsQueryOptions, postQueryOptions } from "~/api/posts";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { useEffect } from "react";
import type { Post } from "~/types/Post";

export const Route = createFileRoute("/posts/$postId")({
  component: PostDetailComponent,
  errorComponent: PostErrorComponent,
  loader({ context: { queryClient }, params }) {
    const postId = parseInt(params.postId, 10);

    const posts: Post[] | undefined = queryClient.getQueryData(
      postsQueryOptions().queryKey,
    );

    const post = posts?.find((post) => post.id === postId);

    if (post) {
      // @TODO: Placeholder data instead?
      queryClient.setQueryData(postQueryOptions(postId).queryKey, {
        ...post,
        title: `${post.title} (from cache)`,
      });
    }

    return queryClient.ensureQueryData(postQueryOptions(postId));
  },
});

function PostErrorComponent({ error }: ErrorComponentProps) {
  const router = useRouter();

  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  return (
    <div>
      <button
        onClick={() => {
          router.invalidate();
        }}
      >
        retry
      </button>
      <ErrorComponent error={error} />
    </div>
  );
}

function PostDetailComponent() {
  const params = Route.useParams();
  const postsQuery = useSuspenseQuery(
    postQueryOptions(parseInt(params.postId, 10)),
  );
  const post = postsQuery.data;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
