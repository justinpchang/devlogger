import { Container } from "@/components/Container";
import { Navbar } from "@/components/Navbar";
import { ProjectForm } from "@/components/ProjectForm";
import { useGetProject } from "@/hooks/useGetProject";
import Head from "next/head";
import { useRouter } from "next/router";

export default function EditProjectPage() {
  const router = useRouter();
  const slug = router.query.slug as string;
  const username = router.query.username as string;

  const { data: project, isLoading } = useGetProject(slug);

  return (
    <>
      <Head>
        <title>
          Edit {username}/{slug}
        </title>
      </Head>
      <Navbar />
      <Container>{!isLoading && project && <ProjectForm editingProject={project} />}</Container>
    </>
  );
}
