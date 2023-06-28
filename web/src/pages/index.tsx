import { Container } from "@/components/Container";
import { Navbar } from "@/components/Navbar";
import { Feed } from "@/components/Feed";
import { UpdateForm } from "@/components/UpdateForm";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function Home() {
  const { data: currentUser } = useCurrentUser();

  return (
    <>
      <Navbar />
      <Container>
        <div className="m-10">
          <UpdateForm />
        </div>
        <pre>{JSON.stringify(currentUser?.email)}</pre>
        <Feed />
      </Container>
    </>
  );
}
