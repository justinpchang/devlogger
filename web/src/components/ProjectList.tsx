import { timeAgo } from "@/services/TimeAgo";
import { Project } from "@/types/project.types";

interface Props {
  username: string;
  projects: Project[] | undefined;
  isLoading: boolean;
}

function ProjectList({ username, projects, isLoading }: Props) {
  if (isLoading || projects === undefined) {
    return <h1>Loading...</h1>;
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {projects.map((project) => (
        <li key={project.id} className="flex items-center justify-between gap-x-6 py-5">
          <a href={`/${username}/${project.slug}`} className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm font-semibold leading-6 text-gray-900">{project.name}</p>
            </div>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p className="whitespace-nowrap">
                {project.last_update_posted_at ? (
                  <>
                    Last updated{" "}
                    <time dateTime={project.last_update_posted_at}>
                      {timeAgo.format(Date.parse(project.last_update_posted_at))}
                    </time>
                  </>
                ) : (
                  <>No updates yet</>
                )}
              </p>
            </div>
          </a>
          <div className="flex flex-none items-center gap-x-4">
            <a
              href={`/${username}/${project.slug}`}
              className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
            >
              View project<span className="sr-only">, {project.name}</span>
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}

export { ProjectList };
