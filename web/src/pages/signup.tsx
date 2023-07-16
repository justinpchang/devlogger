import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { CURRENT_USER_QUERY_KEY } from "@/hooks/useCurrentUser";
import { checkUsernameAvailability } from "@/requests/user.requests";
import { authService } from "@/services/AuthService";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import debounce from "lodash.debounce";

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: signup, isLoading } = useMutation(
    (data: { name: string; username: string; email: string; password: string }) =>
      authService.signup(data),
    {
      onSuccess: () => {
        toast.success("Signed up successfully");
        queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
        router.push("/");
      },
      onError: (error: Error) => {
        setError(error.message);
      },
    }
  );

  const checkUsername = async (username: string) => {
    const isAvailable = await checkUsernameAvailability(username);
    setIsUsernameAvailable(isAvailable);
  };
  const debouncedCheckUsername = useCallback(debounce(checkUsername, 300), []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signup({
      name,
      username,
      email,
      password,
    });
  };

  const isValid =
    name !== "" && username !== "" && isUsernameAvailable && email !== "" && password.length >= 8;

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <Container>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Logo size={80} className="mx-auto" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create a new account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                  <span className="text-gray-400 font-normal">
                    {" "}
                    (Alphanumeric, 3-20 characters)
                  </span>
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => {
                      const username = e.target.value;
                      setUsername(username);
                      debouncedCheckUsername(username);
                    }}
                    className={
                      "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 " +
                      (isUsernameAvailable ? "" : "ring-red-500 focus:ring-red-500")
                    }
                  />
                  {!isUsernameAvailable && (
                    <p className="mt-2 text-sm text-red-500">This username is already taken</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                    <span className="text-gray-400 font-normal">
                      {" "}
                      (Must be at least 8 characters)
                    </span>
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-500">
                  <p>{error}</p>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                  disabled={isLoading || !isValid}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold leading-6 text-teal-600 hover:text-teal-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
