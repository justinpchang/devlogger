import { PaperClipIcon } from "@heroicons/react/20/solid";
import { Tiptap } from "./Tiptap";
import Combobox, { ComboboxOption } from "./Combobox";
import { useMemo, useState } from "react";
import { useGetProjects } from "@/hooks/useGetProjects";
import { useCurrentUser } from "@/hooks/useCurrentUser";

function UpdateForm() {
  const [project, setProject] = useState<ComboboxOption | null>(null);

  const { data: currentUser } = useCurrentUser();
  const { data: projects } = useGetProjects(currentUser?.id);

  const projectOptions = useMemo(() => {
    console.log("processing project options");
    const options = projects?.map((project) => ({
      id: project.id,
      name: project.name,
    }));
    if (options?.length) {
      setProject((project) => {
        if (!project) return options[0];
        return null;
      });
    }
    return options ?? [];
  }, [projects]);

  return (
    <form action="#" className="relative">
      <div className="flex flex-col h-60 overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-mulberry-500 focus-within:ring-1 focus-within:ring-mulberry-500">
        <div className="flex items-center">
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            autoComplete="off"
            className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
          />
          <Combobox
            value={project}
            setValue={setProject}
            options={projectOptions}
            className="flex-shrink-0 pr-1.5 w-50"
          />
        </div>
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <div className="flex-grow overflow-auto">
          <Tiptap className="block w-full border-0 py-0 text-gray-900 px-3 placeholder:text-gray-400 focus:ring-0" />
        </div>

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="py-2">
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-px bottom-0">
        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <div className="flex">
            <button
              type="button"
              className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
            >
              <PaperClipIcon
                className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500"
                aria-hidden="true"
              />
              <span className="text-xs italic text-gray-500 group-hover:text-gray-600">
                Attach an image (Coming soon!)
              </span>
            </button>
          </div>
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-mulberry-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-mulberry-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mulberry-600"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export { UpdateForm };
