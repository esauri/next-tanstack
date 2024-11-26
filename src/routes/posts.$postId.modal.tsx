import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  type ErrorComponentProps,
  createFileRoute,
  ErrorComponent,
  Link,
  useRouter,
} from "@tanstack/react-router";
import { LoaderIcon } from "lucide-react";
import { useEffect } from "react";
import { postQueryOptions } from "~/api/posts";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/Dialog";
import ModalRoute from "~/components/ModalRoute";

export const Route = createFileRoute("/posts/$postId/modal")({
  component: PostDetailModal,
  errorComponent: ErrorModal,
  pendingComponent: LoadingModal,
  pendingMs: 100, // Wait at least 100ms before showing the loading spinner
  loader({ context: { queryClient }, params: { postId } }) {
    return queryClient.ensureQueryData(postQueryOptions(postId));
  },
});

function LoadingModal() {
  return (
    <ModalRoute>
      <div className="flex items-center justify-center py-6 gap-1">
        <LoaderIcon className="size-4 animate-spin" />
        Loading...
      </div>
    </ModalRoute>
  );
}

function ErrorModal({ error }: ErrorComponentProps) {
  const router = useRouter();

  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  return (
    <ModalRoute>
      <DialogHeader>
        <DialogTitle>Error</DialogTitle>
        <DialogDescription>Failed to load post.</DialogDescription>
      </DialogHeader>
      <ErrorComponent error={error} />
      <DialogFooter>
        <button
          onClick={() => {
            router.invalidate();
          }}
        >
          retry
        </button>
      </DialogFooter>
    </ModalRoute>
  );
}

function PostDetailModal() {
  const params = Route.useParams();
  const postsQuery = useSuspenseQuery(postQueryOptions(params.postId));
  const post = postsQuery.data;

  return (
    <ModalRoute>
      <DialogHeader>
        <DialogTitle>{post.title}</DialogTitle>
        <DialogDescription>{post.body}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Link to="/posts/$postId" params={{ postId: params.postId }}>
          View full post
        </Link>
      </DialogFooter>
    </ModalRoute>
  );
}
