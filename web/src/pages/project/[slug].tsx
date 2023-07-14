import { Container } from "@/components/Container";
import { Feed } from "@/components/Feed";
import { Navbar } from "@/components/Navbar";
import { useCreateSubscription } from "@/hooks/useCreateSubscription";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useDeleteSubscription } from "@/hooks/useDeleteSubscription";
import { useGetProject } from "@/hooks/useGetProject";
import { useGetUpdatesForProject } from "@/hooks/useGetUpdatesForProject";
import { getLink } from "@/requests/feed.requests";
import { PencilIcon, RssIcon } from "@heroicons/react/20/solid";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ProjectPage() {
  const router = useRouter();
  const slug = router.query.slug as string | undefined;

  const { data: currentUser } = useCurrentUser();
  const { data: project, isLoading } = useGetProject(slug);
  const { data: updates, isLoading: isUpdatesLoading } = useGetUpdatesForProject(slug);
  const { mutate: subscribe } = useCreateSubscription({
    slug: slug!,
  });
  const { mutate: unsubscribe } = useDeleteSubscription({
    slug: slug!,
  });

  if (isLoading || !project) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Head>
        <title>
          {project.user.username}/{project.slug}
        </title>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${project.user.username}/${project.slug}'s RSS feed`}
          href={`${getLink("rss", { slug: project.slug })}`}
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title={`${project.user.username}/${project.slug}'s Atom feed`}
          href={`${getLink("atom", { slug: project.slug })}`}
        />
      </Head>
      <Navbar />
      <Container>
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <nav className="hidden sm:flex" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2">
              <li>
                <div className="flex">
                  <Link
                    href={`/profile/${project.user.username}`}
                    className="text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    {project.user.username}
                  </Link>
                </div>
              </li>
              <li>
                <span className="text-sm text-gray-400">/</span>
              </li>
              <li>
                <p className="text-sm font-medium text-gray-500 cursor-default">{project.name}</p>
              </li>
            </ol>
          </nav>
          <div className="block md:flex items-start justify-between">
            <div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {project.name}
              </h1>
              <p className="mt-2 text-base font-semibold leading-7 text-teal-600">
                By {project.user.name}
              </p>
            </div>
            <div className="flex space-x-2">
              {currentUser?.id === project.user.id && (
                <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    href={`/project/${project.slug}/edit`}
                    className="inline-flex rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <button type="button" className="inline-flex justify-center gap-x-1.5 w-full">
                      <PencilIcon className="-ml-0.5 h-5 w-5 text-gray-400" />
                      Edit project
                    </button>
                  </Link>
                </div>
              )}
              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                <button
                  type="button"
                  onClick={() => (project.subscribed ? unsubscribe() : subscribe())}
                  className={
                    "inline-flex justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm " +
                    (project.subscribed
                      ? "bg-white text-teal-600 hover:bg-gray-50 ring-1 ring-inset ring-gray-300"
                      : "bg-teal-600 text-white hover:bg-teal-500")
                  }
                >
                  <RssIcon className="-ml-0.5 h-5 w-5" />
                  {project.subscribed ? "Subscribed" : "Subscribe"}
                </button>
              </div>
            </div>
          </div>

          <p className="mt-6 text-lg leading-8">{project.description}</p>
        </div>
        <div className="mt-6">
          <Feed updates={updates} isLoading={isUpdatesLoading} />
        </div>
      </Container>
    </>
  );
}
