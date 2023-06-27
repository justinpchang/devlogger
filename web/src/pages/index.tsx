import { Container } from "@/components/Container";
import { Navbar } from "@/components/Navbar";
import { ProjectForm } from "@/components/ProjectForm";
import { UpdateForm } from "@/components/UpdateForm";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function Home() {
  const { data: currentUser } = useCurrentUser();

  return (
    <>
      <Navbar />
      <Container>
        <pre>{JSON.stringify(currentUser?.email)}</pre>
      </Container>
    </>
  );
}
