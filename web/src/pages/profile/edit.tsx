import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Container } from "@/components/Container";
import { Navbar } from "@/components/Navbar";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useUploadAvatar } from "@/hooks/useUploadAvatar";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import Head from "next/head";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [website, setWebsite] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: currentUser, isLoading: isCurrentUserLoading } = useCurrentUser();
  const { mutate: uploadAvatar, isLoading: isUploadingAvatar } = useUploadAvatar();
  const { mutate: updateUser, isLoading: isUpdatingUser } = useUpdateUser();

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name ?? "");
      setAbout(currentUser.about ?? "");
      setWebsite(currentUser.website ?? "");
    }
  }, [currentUser]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUser({
      name,
      about,
      website,
    });
  };

  const handleAvatarUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const files = event.target.files;

    if (!files || files.length === 0) {
      toast.error("For some reason the upload didn't work. Please try again.");
      return;
    }

    const file = files[0];

    const MAX_FILE_SIZE_IN_BYTES = 5_000_000; // 5MB
    if (file.size > MAX_FILE_SIZE_IN_BYTES) {
      toast.error("The file is too large. Please upload a file smaller than 5MB.");
      return;
    }

    uploadAvatar(file);

    event.target.value = "";
  };

  const isValid = !!name;

  return (
    <>
      <Head>
        <title>Edit your profile</title>
      </Head>
      <Navbar />
      <Container>
        <form onSubmit={handleSubmit} className="my-12">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-2xl font-semibold leading-7 text-gray-900">Update profile</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what you share
              </p>

              <hr className="mt-10" />

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="avatar"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Avatar
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    {currentUser?.avatar.url ? (
                      <Image
                        src={currentUser?.avatar.url}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full"
                        alt="Your avatar"
                      />
                    ) : (
                      <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                    )}
                    <button
                      type="button"
                      disabled={isUploadingAvatar}
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Change
                    </button>
                  </div>
                  <input
                    id="avatar"
                    type="file"
                    accept="image/png, image/jpeg, image/gif"
                    ref={fileInputRef}
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-teal-600 sm:max-w-md">
                      <input
                        type="text"
                        id="username"
                        autoComplete="new-password"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="website"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Website
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-teal-600 sm:max-w-md">
                      <input
                        type="text"
                        id="website"
                        autoComplete="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    About
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about yourself.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdatingUser || !isValid}
              className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </form>
      </Container>
    </>
  );
}
