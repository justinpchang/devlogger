import { PencilIcon, RssIcon } from "@heroicons/react/20/solid";
import { Container } from "@/components/Container";
import { Navbar } from "@/components/Navbar";
import { useGetUser } from "@/hooks/useGetUser";
import { useRouter } from "next/router";
import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Feed } from "@/components/Feed";
import { useGetUpdatesForUser } from "@/hooks/useGetUpdatesForUser";
import { ProjectList } from "@/components/ProjectList";
import { useGetProjects } from "@/hooks/useGetProjects";
import { useCreateSubscription } from "@/hooks/useCreateSubscription";
import { useDeleteSubscription } from "@/hooks/useDeleteSubscription";
import Head from "next/head";
import { getLink } from "@/requests/feed.requests";

const TABS = ["Profile", "Projects", "Updates"] as const;

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfilePage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Profile");
  const router = useRouter();

  const username = router.query.username as string;

  const { data: user } = useGetUser(username);
  const { data: currentUser } = useCurrentUser();
  const { data: projects, isLoading: isProjectsLoading } = useGetProjects(username);
  const { data: updates, isLoading: isUpdatesLoading } = useGetUpdatesForUser(username);
  const { mutate: subscribe } = useCreateSubscription({
    username: user?.username!,
  });
  const { mutate: unsubscribe } = useDeleteSubscription({
    username: user?.username!,
  });

  useEffect(() => {
    if (tab !== router.query.tab)
      setTab((router.query.tab as (typeof TABS)[number] | undefined) ?? "Profile");
  }, [router.query.tab, tab, router]);

  const handleTabClick = (newTab: (typeof TABS)[number]) => {
    router.replace({
      query: { ...router.query, tab: newTab },
    });
  };

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Head>
        <title>{username}</title>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${username}'s RSS feed`}
          href={`/api/feeds/${getLink("rss", { username })}`}
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title={`${username}'s Atom feed`}
          href={`/api/feeds/${getLink("atom", { username })}`}
        />
      </Head>
      <Navbar />
      <Container>
        <div className="flex h-full">
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="relative z-0 flex flex-1">
              <main className="relative z-0 flex-1 focus:outline-none xl:order-last">
                <article>
                  {/* Profile header */}
                  <div>
                    <div className="h-20" />
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                      <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                        <div className="flex">
                          <Avatar user={user} size="lg" />
                        </div>
                        <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                          <div className="mt-6 block min-w-0 flex-1 sm:hidden">
                            <h1 className="text-2xl font-semibold text-gray-900">{user.name}</h1>
                            <h2 className="text-xl font-light text-gray-500 tracking-tight">
                              @{user.username}
                            </h2>
                          </div>
                          {currentUser?.id === user.id && (
                            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                              <Link
                                href="/profile/edit"
                                className="inline-flex rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              >
                                <button
                                  type="button"
                                  className="inline-flex justify-center gap-x-1.5 w-full"
                                >
                                  <PencilIcon className="-ml-0.5 h-5 w-5 text-gray-400" />
                                  Edit profile
                                </button>
                              </Link>
                            </div>
                          )}
                          <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                            <button
                              type="button"
                              onClick={() => {
                                user.subscribed ? unsubscribe() : subscribe();
                              }}
                              className={
                                "inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 " +
                                (user.subscribed ? "text-teal-600" : "text-gray-900")
                              }
                            >
                              <RssIcon
                                className={
                                  "-ml-0.5 h-5 w-5 " +
                                  (user.subscribed ? "text-teal-500" : "text-gray-400")
                                }
                              />
                              {user.subscribed ? "Subscribed" : "Subscribe"}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 hidden min-w-0 flex-1 sm:block">
                        <h1 className="text-2xl font-semibold text-gray-900">{user.name}</h1>
                        <h2 className="text-xl font-light text-gray-500 tracking-tight">
                          @{user.username}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="mt-6 sm:mt-2 2xl:mt-5">
                    <div className="border-b border-gray-200">
                      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                          {TABS.map((tabName) => (
                            <div
                              key={"tab-" + tabName}
                              onClick={() => handleTabClick(tabName)}
                              aria-current={tab === tabName}
                              className={classNames(
                                tab === tabName
                                  ? "border-teal-500 text-gray-900"
                                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium hover:cursor-pointer"
                              )}
                            >
                              {tabName}
                            </div>
                          ))}
                        </nav>
                      </div>
                    </div>
                  </div>

                  <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    {tab === "Profile" && (
                      <dl className="mt-6 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        {user.about && (
                          <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">About</dt>
                            <dd className="mt-1 max-w-prose space-y-5 text-sm text-gray-900">
                              {user.about}
                            </dd>
                          </div>
                        )}
                        {user.website && (
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Website</dt>
                            <dd className="mt-1 text-sm text-gray-900">{user.website}</dd>
                          </div>
                        )}
                      </dl>
                    )}

                    {tab === "Projects" && (
                      <ProjectList projects={projects} isLoading={isProjectsLoading} />
                    )}

                    {tab === "Updates" && <Feed updates={updates} isLoading={isUpdatesLoading} />}
                  </div>
                </article>
              </main>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
