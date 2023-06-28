import { UpdateForFeed } from "@/types/update.types";
import { GradientAvatar } from "../Avatar/GradientAvatar";
import { Update } from "./Update";

const updates: UpdateForFeed[] = [
  {
    id: 1,
    project_id: 1,
    title: "Update on how to write a blog post",
    description:
      "Like many things in life, blogging is easier said than done.  You might have a great concept for a post, but when it comes time to write it, it just doesn’t come out the way you want it.  Or even worse, you get a nasty case of writer’s block and spend hours staring at a blank page with nothing to show.  If you’re having trouble getting the gears turning for your blog, then keep reading.  This article will teach you everything you need to know about writing your next blog post and give a few insightful examples to encourage and inspire you.",
    updated_at: "2023-01-23T15:56",
    created_at: "2023-01-23T15:56",
    project: {
      name: "Blog post tips",
      id: 0,
      user_id: 0,
      slug: "",
      homepage: null,
      description: null,
      created_at: "",
      updated_at: "",
    },
    user: {
      username: "chelseahagon",
      id: 0,
      email: "",
      created_at: "",
      updated_at: "",
    },
  },
];

function Feed() {
  return (
    <ul role="list" className="space-y-6">
      {updates.map((update) => (
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
      ))}
    </ul>
  );
}

export { Feed };
