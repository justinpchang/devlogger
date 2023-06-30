import { PencilIcon, RssIcon } from "@heroicons/react/20/solid";
import { Container } from "@/components/Container";
import { Navbar } from "@/components/Navbar";
import { useGetUser } from "@/hooks/useGetUser";
import { useRouter } from "next/router";
import Image from "next/image";
import { GradientAvatar } from "@/components/Avatar/GradientAvatar";
import Link from "next/link";

const tabs = [
  { name: "Profile", href: "#", current: true },
  { name: "Projects", href: "#", current: false },
  { name: "Updates", href: "#", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: user } = useGetUser(router.query.username as string);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Navbar />
      <Container>
        <div className="flex h-full">
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
            <div className="relative z-0 flex flex-1 overflow-hidden">
              <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
                <article>
                  {/* Profile header */}
                  <div>
                    <div className="h-20" />
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                      <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                        <div className="flex">
                          {user.avatar.url ? (
                            <Image
                              src={user.avatar.url}
                              width={96}
                              height={96}
                              alt="Avatar"
                              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                            />
                          ) : (
                            <GradientAvatar
                              name={user.name}
                              size={96}
                              className="h-12 w-12 text-gray-300"
                            />
                          )}
                        </div>
                        <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                          <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                            <button
                              type="button"
                              className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                              <RssIcon className="-ml-0.5 h-5 w-5 text-gray-400" />
                              Subscribe
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
                          {tabs.map((tab) => (
                            <a
                              key={tab.name}
                              href={tab.href}
                              className={classNames(
                                tab.current
                                  ? "border-mulberry-500 text-gray-900"
                                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
                              )}
                              aria-current={tab.current ? "page" : undefined}
                            >
                              {tab.name}
                            </a>
                          ))}
                        </nav>
                      </div>
                    </div>
                  </div>

                  <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
                    <Link href="/profile/edit">
                      <button
                        type="button"
                        className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 mb-6 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        <PencilIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        Edit profile
                      </button>
                    </Link>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
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
