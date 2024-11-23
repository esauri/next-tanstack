import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  type ErrorComponentProps,
  createFileRoute,
  ErrorComponent,
  useRouter,
} from "@tanstack/react-router";
import { LoaderIcon } from "lucide-react";
import { useEffect } from "react";
import { postQueryOptions } from "~/api/posts";

export const Route = createFileRoute("/posts_/$postId/")({
  component: PostDetailPage,
  errorComponent: ErrorPage,
  pendingComponent: LoadingPage,
  pendingMs: 100, // Wait at least 100ms before showing the loading spinner
  loader({ context: { queryClient }, params: { postId } }) {
    return queryClient.ensureQueryData(postQueryOptions(postId));
  },
});

function LoadingPage() {
  return (
    <div className="flex items-center justify-center py-6 gap-1">
      <LoaderIcon className="size-4 animate-spin" />
      Loading...
    </div>
  );
}

function ErrorPage({ error }: ErrorComponentProps) {
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

function PostDetailPage() {
  const params = Route.useParams();
  const postsQuery = useSuspenseQuery(postQueryOptions(params.postId));
  const post = postsQuery.data;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
