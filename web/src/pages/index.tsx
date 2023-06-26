import { Container } from "@/components/Container";
import { Navbar } from "@/components/Navbar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { authService } from "@/services/AuthService";
import Link from "next/link";

export default function Home() {
  const { data: currentUser } = useCurrentUser();

  return (
    <>
      <Navbar />
      <Container>
        <h1>Hello, world!</h1>
        <pre>{JSON.stringify(currentUser?.email)}</pre>
        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
        <button onClick={() => authService.logout()}>Logout</button>
      </Container>
    </>
  );
}
