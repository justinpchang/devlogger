import { Container } from "@/components/Container";
import { Navbar } from "@/components/Navbar";
import { ProjectForm } from "@/components/ProjectForm";
import Head from "next/head";

export default function NewProject() {
  // TODO: Add authentication

  return (
    <>
      <Head>
        <title>Create a new project</title>
      </Head>
      <Navbar />
      <Container>
        <ProjectForm />
      </Container>
    </>
  );
}
