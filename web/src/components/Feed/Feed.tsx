import { UpdateForFeed } from "@/types/update.types";
import { Avatar } from "../Avatar";
import { Update } from "./Update";
import Link from "next/link";

interface Props {
  updates: UpdateForFeed[] | undefined;
  isLoading: boolean;
}

function Feed({ updates, isLoading }: Props) {
  return (
    <ul role="list" className="space-y-6">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        updates?.map((update) => (
          <li key={update.id} className="relative flex gap-x-4">
            <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
              <div className="w-px bg-gray-200" />
            </div>
            <Link href={`/profile/${update.user.username}`}>
              <Avatar user={update.user} size="xs" className="relative mt-3 w-6 h-6" />
            </Link>
            <Update update={update} />
          </li>
        ))
      )}
    </ul>
  );
}

export { Feed };
