import { timeAgo } from "@/services/TimeAgo";
import { UpdateForFeed } from "@/types/update.types";

interface Props {
  update: UpdateForFeed;
}

function Update({ update }: Props) {
  return (
    <div className="w-full">
      <div className="mt-[0.6rem] ml-1 flex gap-x-1">
        <div className="py-0.5 text-xs leading-5 text-gray-500">
          <span className="font-medium text-gray-900">{update.user.username}</span> posted an update
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
          {update.user.username}
          <div className="text-lg -mt-1 font-light">/</div>
          {update.project.name}
        </h2>
        <h1 className="text-md text-gray-900 leading-6">{update.title}</h1>
        <p className="text-sm leading-6 text-gray-500 text-justify">{update.description}</p>
      </div>
    </div>
  );
}

export { Update };
