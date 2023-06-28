import { GradientAvatar } from "../Avatar/GradientAvatar";
import { Update } from "./Update";
import { useUpdatesForGlobal } from "@/hooks/useUpdatesForGlobal";

function Feed() {
  const { data: updates, isLoading } = useUpdatesForGlobal();

  return (
    <ul role="list" className="space-y-6">
      {isLoading || !updates ? (
        <div>Loading...</div>
      ) : (
        updates?.map((update) => (
          <li key={update.id} className="relative flex gap-x-4">
            <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
              <div className="w-px bg-gray-200" />
            </div>
            <GradientAvatar
              name={update.user.username!}
              size={24}
              classNames="relative mt-3 w-6 h-6"
            />
            <Update update={update} />
          </li>
        ))
      )}
    </ul>
  );
}

export { Feed };
