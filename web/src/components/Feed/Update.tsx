import { useCurrentUser } from "@/hooks/useCurrentUser";
import { createUpvote, deleteUpvote } from "@/requests/upvote.requests";
import { timeAgo } from "@/services/TimeAgo";
import { UpdateForFeed } from "@/types/update.types";
import { ChevronDoubleUpIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

interface Props {
  update: UpdateForFeed;
}

function Update({ update }: Props) {
  const [recentAction, setRecentAction] = useState<"create" | "delete" | null>(null);

  const { data: currentUser } = useCurrentUser();

  const { mutate: upvote } = useMutation(() => createUpvote(update.id), {
    onSuccess: () => {
      setRecentAction((recent) => (recent === "delete" ? null : "create"));
    },
    onError: () => {
      toast.error("Error upvoting. Please try again later.");
    },
  });
  const { mutate: unUpvote } = useMutation(() => deleteUpvote(update.id), {
    onSuccess: () => {
      setRecentAction((recent) => (recent === "create" ? null : "delete"));
    },
    onError: () => {
      toast.error("Error removing upvote. Please try again later.");
    },
  });
  const upvoted = (update.upvoted && recentAction === null) || recentAction === "create";

  return (
    <div className="w-full">
      <div className="mt-[0.65rem] ml-1 flex gap-x-1">
        <div className="py-0.5 text-xs leading-5 text-gray-500">
          <Link href={`/${update.user.username}`} className="font-medium text-gray-900">
            {update.user.name}
          </Link>{" "}
          posted an update
        </div>
        &middot;
        <time
          dateTime={update.created_at}
          className="flex-none py-0.5 text-xs leading-5 text-gray-500"
        >
          {timeAgo.format(Date.parse(update.created_at))}
        </time>
      </div>
      <div className="w-full rounded-md mt-2 p-5 ring-1 ring-inset ring-gray-200 flex flex-col gap-y-2">
        <h2 className="text-sm text-gray-900 flex gap-x-1 font-semibold">
          <Link href={`/${update.user.username}`}>{update.user.username}</Link>
          <div className="text-lg -mt-1 font-light">/</div>
          <Link href={`/project/${update.project.slug}`}>{update.project.name}</Link>
        </h2>
        <h1 className="text-md text-gray-900 leading-6">{update.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: update.description }}
          className="ProseMirror text-sm leading-6 text-gray-500 text-justify"
        />
        <div className="flex -mb-3 mt-2 items-center justify-between">
          <div
            onClick={() => currentUser && (upvoted ? unUpvote() : upvote())}
            className={
              "flex flex-col items-center hover:cursor-pointer " +
              (upvoted ? "text-teal-600 hover:text-teal-500" : "text-gray-400 hover:text-gray-500")
            }
          >
            <ChevronDoubleUpIcon className="w-5 h-5" />
            <div className="text-xs leading-4">
              {update.upvotes +
                Number(recentAction === "create" && 1) +
                Number(recentAction === "delete" && -1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Update };
