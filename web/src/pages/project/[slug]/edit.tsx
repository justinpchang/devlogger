import { Container } from "@/components/Container";
import { Navbar } from "@/components/Navbar";
import { ProjectForm } from "@/components/ProjectForm";
import { useGetProject } from "@/hooks/useGetProject";
import Head from "next/head";
import { useRouter } from "next/router";

export default function EditProjectPage() {
  const router = useRouter();
  const slug = router.query.slug as string | undefined;

  const { data: project, isLoading } = useGetProject(slug);

  return (
    <>
      <Head>
        <title>
          Edit {project?.user.username}/{project?.slug}
        </title>
      </Head>
      <Navbar />
      <Container>{!isLoading && project && <ProjectForm editingProject={project} />}</Container>
    </>
  );
}
