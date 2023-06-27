import { Container } from "@/components/Container";
import { Navbar } from "@/components/Navbar";
import { ProjectForm } from "@/components/ProjectForm";

export default function NewProject() {
  // TODO: Add authentication

  return (
    <>
      <Navbar />
      <Container>
        <ProjectForm />
      </Container>
    </>
  );
}
