import { useState } from "react";
import parameterize from "parameterize";
import { useRouter } from "next/router";
import { useCreateProject } from "@/hooks/useCreateProject";

function ProjectForm() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [homepage, setHomepage] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();
  const { mutate: createProject, isLoading: isSubmitting } = useCreateProject();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProject({ name, slug, homepage, description });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setSlug(parameterize(e.target.value));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
  };

  const isValid = name && slug;

  return (
    <form onSubmit={handleSubmit} className="my-12">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-8">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">Create a new project</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            A project is a collection of updates that you share with the world.
          </p>

          <hr className="my-2" />
          <p className="text-sm leading-6 text-gray-400">
            <em>Required fields are marked with an asterisk (*).</em>
          </p>

          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="project-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Project name *
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-mulberry-600 sm:max-w-md">
                  <input
                    type="text"
                    name="project-name"
                    id="project-name"
                    autoComplete="off"
                    placeholder="My Cool Project"
                    value={name}
                    onChange={handleNameChange}
                    className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="project-slug"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Project URL
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-mulberry-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    inpublic.dev/
                  </span>
                  <input
                    type="text"
                    name="project-slug"
                    id="project-slug"
                    autoComplete="off"
                    placeholder="my-cool-project"
                    value={slug}
                    readOnly
                    className="pointer-events-none block flex-1 border-0 bg-transparent py-1.5 pl-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="homepage"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Homepage URL
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-mulberry-600 sm:max-w-md">
                  <input
                    type="text"
                    name="homepage"
                    id="homepage"
                    autoComplete="off"
                    placeholder="https://github.com/simonsays/my-cool-project"
                    value={homepage}
                    onChange={(e) => setHomepage(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                <em>Write a few sentences about your project.</em>
              </p>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mulberry-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-mulberry-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-mulberry-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mulberry-600 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting || !isValid}
        >
          Save
        </button>
      </div>
    </form>
  );
}

export { ProjectForm };
